import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/check-domains/route";

function mockFetch(status: number, finalUrl: string) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    status,
    url: finalUrl,
  } as Response);
}

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
  vi.restoreAllMocks();
});

describe("POST /api/check-domains", () => {
  it("returns NDJSON content-type", async () => {
    mockFetch(200, "https://google.com/");
    const res = await POST(makeRequest(["https://google.com"]));
    expect(res.headers.get("content-type")).toBe("application/x-ndjson");
  });

  it("returns one result per URL", async () => {
    mockFetch(200, "https://apple.com/");
    const res = await POST(makeRequest(["https://apple.com", "https://google.com"]));
    const results = await readNdjson(res);
    expect(results).toHaveLength(2);
  });

  it("classifies a 200 response as ok", async () => {
    mockFetch(200, "https://apple.com/");
    const res = await POST(makeRequest(["https://apple.com"]));
    const [result] = await readNdjson(res);
    expect(result.status).toBe(200);
    expect(result.category).toBe("ok");
  });

  it("classifies a 404 response as error", async () => {
    mockFetch(404, "https://broken.com/");
    const res = await POST(makeRequest(["https://broken.com"]));
    const [result] = await readNdjson(res);
    expect(result.status).toBe(404);
    expect(result.category).toBe("error");
  });

  it("classifies a navigation failure as network-error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("fetch failed"));
    const res = await POST(makeRequest(["https://doesnotexist.invalid"]));
    const [result] = await readNdjson(res);
    expect(result.status).toBeNull();
    expect(result.category).toBe("network-error");
  });

  it("detects cross-host redirect as redirect category", async () => {
    mockFetch(200, "https://us.braun.com/en-us/");
    const res = await POST(makeRequest(["https://braun.com"]));
    const [result] = await readNdjson(res);
    expect(result.category).toBe("redirect");
    expect(result.finalUrl).toBe("https://us.braun.com/en-us/");
  });
});
