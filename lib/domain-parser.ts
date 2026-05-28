import { z } from "zod";

const urlValidator = z.url();

function toUrl(raw: string): string | null {
  if (urlValidator.safeParse(raw).success) return raw;
  const withProtocol = `https://${raw}`;
  if (urlValidator.safeParse(withProtocol).success) return withProtocol;
  return null;
}

export function parseUrls(text: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const url = toUrl(trimmed);
    if (url && !seen.has(url)) {
      seen.add(url);
      result.push(url);
    }
  }

  return result;
}
