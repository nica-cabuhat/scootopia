export type DomainCategory = "ok" | "redirect" | "error" | "network-error";

export type DomainResult = {
  url: string;
  finalUrl: string | null;
  status: number | null;
  category: DomainCategory;
};

function normalizeHost(hostname: string): string {
  return hostname.replace(/^www\./, "");
}

function isExternalRedirect(originalUrl: string, finalUrl: string): boolean {
  try {
    const original = new URL(originalUrl);
    const final = new URL(finalUrl);
    return normalizeHost(original.hostname) !== normalizeHost(final.hostname);
  } catch {
    return false;
  }
}

export function classify(
  status: number | null,
  originalUrl: string,
  finalUrl: string | null,
): DomainCategory {
  if (status === null) return "network-error";
  if (status >= 400) return "error";
  if (finalUrl && isExternalRedirect(originalUrl, finalUrl)) return "redirect";
  return "ok";
}
