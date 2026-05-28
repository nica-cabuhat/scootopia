import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/check-domains/route";

const { mockPage, mockContext, mockBrowser } = vi.hoisted(() => {
  const mockPage = {
    goto: vi.fn(),
    url: vi.fn(),
  };
  const mockContext = {
    newPage: vi.fn().mockResolvedValue(mockPage),
    addInitScript: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
  };
  const mockBrowser = {
    newContext: vi.fn().mockResolvedValue(mockContext),
    isConnected: vi.fn().mockReturnValue(true),
  };
  return { mockPage, mockContext, mockBrowser };
});

vi.mock("playwright", () => ({
  chromium: {
    launch: vi.fn().mockResolvedValue(mockBrowser),
  },
}));

async function readNdjson(response: Response) {
  const text = await response.text();
  return text.split("\n").filter(Boolean).map((line) => JSON.parse(line));
}

function makeRequest(urls: string[]) {
  return new Request("http://localhost/api/check-domains", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls }),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockBrowser.isConnected.mockReturnValue(true);
  mockBrowser.newContext.mockResolvedValue(mockContext);
  mockContext.newPage.mockResolvedValue(mockPage);
  mockContext.addInitScript.mockResolvedValue(undefined);
  mockContext.close.mockResolvedValue(undefined);
});

describe("POST /api/check-domains", () => {
  it("returns NDJSON content-type", async () => {
    mockPage.goto.mockResolvedValue({ status: () => 200 });
    mockPage.url.mockReturnValue("https://google.com/");

    const res = await POST(makeRequest(["https://google.com"]));
    expect(res.headers.get("content-type")).toBe("application/x-ndjson");
  });

  it("returns one result per URL", async () => {
    mockPage.goto.mockResolvedValue({ status: () => 200 });
    mockPage.url.mockReturnValue("https://apple.com/");

    const res = await POST(makeRequest(["https://apple.com", "https://google.com"]));
    const results = await readNdjson(res);
    expect(results).toHaveLength(2);
  });

  it("classifies a 200 response as ok", async () => {
    mockPage.goto.mockResolvedValue({ status: () => 200 });
    mockPage.url.mockReturnValue("https://apple.com/");

    const res = await POST(makeRequest(["https://apple.com"]));
    const [result] = await readNdjson(res);
    expect(result.status).toBe(200);
    expect(result.category).toBe("ok");
  });

  it("classifies a 404 response as error", async () => {
    mockPage.goto.mockResolvedValue({ status: () => 404 });
    mockPage.url.mockReturnValue("https://broken.com/");

    const res = await POST(makeRequest(["https://broken.com"]));
    const [result] = await readNdjson(res);
    expect(result.status).toBe(404);
    expect(result.category).toBe("error");
  });

  it("classifies a navigation failure as network-error", async () => {
    mockPage.goto.mockRejectedValue(new Error("net::ERR_NAME_NOT_RESOLVED"));

    const res = await POST(makeRequest(["https://doesnotexist.invalid"]));
    const [result] = await readNdjson(res);
    expect(result.status).toBeNull();
    expect(result.category).toBe("network-error");
  });

  it("detects cross-host redirect as redirect category", async () => {
    mockPage.goto.mockResolvedValue({ status: () => 200 });
    mockPage.url.mockReturnValue("https://us.braun.com/en-us/page");

    const res = await POST(makeRequest(["https://braun.com"]));
    const [result] = await readNdjson(res);
    expect(result.category).toBe("redirect");
    expect(result.finalUrl).toBe("https://us.braun.com/en-us/page");
  });

  it("closes the browser context after each check", async () => {
    mockPage.goto.mockResolvedValue({ status: () => 200 });
    mockPage.url.mockReturnValue("https://apple.com/");

    const res = await POST(makeRequest(["https://apple.com"]));
    await res.text(); // drain stream so start() completes
    expect(mockContext.close).toHaveBeenCalledTimes(1);
  });
});
