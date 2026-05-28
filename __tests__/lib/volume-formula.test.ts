import { describe, it, expect } from "vitest";
import { calcVideoVolume, calcNativeVolume } from "@/lib/volume-formula";

describe("calcVideoVolume", () => {
  it("returns 58% of banner volume rounded", () => {
    expect(calcVideoVolume(100)).toBe(58);
    expect(calcVideoVolume(1000)).toBe(580);
  });

  it("rounds correctly", () => {
    expect(calcVideoVolume(1)).toBe(1); // 0.58 → 1
    expect(calcVideoVolume(2)).toBe(1); // 1.16 → 1
  });

  it("returns 0 for 0 input", () => {
    expect(calcVideoVolume(0)).toBe(0);
  });
});

describe("calcNativeVolume", () => {
  it("returns 15.6% of banner volume rounded (0.6 * 0.26)", () => {
    expect(calcNativeVolume(100)).toBe(16);
    expect(calcNativeVolume(1000)).toBe(156);
  });

  it("returns 0 for 0 input", () => {
    expect(calcNativeVolume(0)).toBe(0);
  });
});
