import { describe, it, expect } from "vitest";
import { classify } from "@/lib/domain-classifier";

describe("classify", () => {
  it("returns ok for 2xx status with no external redirect", () => {
    expect(classify(200, "https://google.com", "https://www.google.com")).toBe("ok");
    expect(classify(200, "https://ibm.com", "https://www.ibm.com/us-en")).toBe("ok");
  });

  it("returns redirect when final host differs from original", () => {
    expect(classify(200, "https://braun.com", "https://us.braun.com/en-us/page")).toBe("redirect");
  });

  it("returns error for 4xx/5xx", () => {
    expect(classify(404, "https://example.com", "https://example.com/404")).toBe("error");
    expect(classify(500, "https://example.com", "https://example.com")).toBe("error");
    expect(classify(403, "https://sony.com", "https://sony.com")).toBe("error");
  });

  it("returns network-error for null status", () => {
    expect(classify(null, "https://example.com", null)).toBe("network-error");
  });

  it("treats www as same host", () => {
    expect(classify(200, "https://google.com", "https://www.google.com")).toBe("ok");
    expect(classify(200, "https://www.apple.com", "https://apple.com")).toBe("ok");
  });
});
