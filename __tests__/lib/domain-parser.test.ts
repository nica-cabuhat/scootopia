import { describe, it, expect } from "vitest";
import { parseUrls } from "@/lib/domain-parser";

describe("parseUrls", () => {
  it("parses full URLs", () => {
    expect(parseUrls("https://google.com")).toEqual(["https://google.com"]);
  });

  it("prepends https:// to bare domains", () => {
    expect(parseUrls("google.com")).toEqual(["https://google.com"]);
  });

  it("deduplicates URLs", () => {
    const input = "https://google.com\nhttps://google.com\nhttps://apple.com";
    expect(parseUrls(input)).toEqual(["https://google.com", "https://apple.com"]);
  });

  it("strips empty lines", () => {
    const input = "https://google.com\n\n\nhttps://apple.com";
    expect(parseUrls(input)).toHaveLength(2);
  });

  it("ignores invalid entries", () => {
    expect(parseUrls("just some random text")).toEqual([]);
    expect(parseUrls("")).toEqual([]);
  });

  it("preserves order", () => {
    const input = "https://apple.com\nhttps://google.com\nhttps://microsoft.com";
    expect(parseUrls(input)).toEqual([
      "https://apple.com",
      "https://google.com",
      "https://microsoft.com",
    ]);
  });
});
