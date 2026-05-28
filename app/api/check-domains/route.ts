import pLimit from "p-limit";
import { classify } from "@/lib/domain-classifier";

const STEALTH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Upgrade-Insecure-Requests": "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Sec-CH-UA": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
  "Sec-CH-UA-Mobile": "?0",
  "Sec-CH-UA-Platform": '"macOS"',
  Connection: "keep-alive",
};

async function checkUrl(url: string) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
      headers: STEALTH_HEADERS,
    });
    return { status: res.status, finalUrl: res.url };
  } catch {
    return { status: null, finalUrl: null };
  }
}

export async function POST(request: Request) {
  const { urls } = (await request.json()) as { urls: string[] };

  const limit = pLimit(5);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const tasks = urls.map((url) =>
        limit(async () => {
          const { status, finalUrl } = await checkUrl(url);
          const result = { url, finalUrl, status, category: classify(status, url, finalUrl) };
          controller.enqueue(encoder.encode(JSON.stringify(result) + "\n"));
        }),
      );
      await Promise.all(tasks);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson" },
  });
}
