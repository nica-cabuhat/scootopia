export function calcVideoVolume(bannerVolume: number): number {
  return Math.round(bannerVolume * 0.58);
}

export function calcNativeVolume(bannerVolume: number): number {
  return Math.round(bannerVolume * 0.6 * 0.26);
}
