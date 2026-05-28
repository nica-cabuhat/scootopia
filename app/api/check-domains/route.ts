import pLimit from "p-limit";
import { chromium, Browser, BrowserContext } from "playwright";
import { classify } from "@/lib/domain-classifier";

let browser: Browser | null = null;

async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    browser = await chromium.launch({
      headless: true,
      channel: "chrome",
      args: ["--disable-blink-features=AutomationControlled"],
    });
  }
  return browser;
}

async function newStealthContext(b: Browser): Promise<BrowserContext> {
  const ctx = await b.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
    locale: "en-US",
    extraHTTPHeaders: {
      "Accept-Language": "en-US,en;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    },
  });
  await ctx.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });
  return ctx;
}

export async function POST(request: Request) {
  const { urls } = (await request.json()) as { urls: string[] };

  const limit = pLimit(5);
  const encoder = new TextEncoder();
  const b = await getBrowser();

  const stream = new ReadableStream({
    async start(controller) {
      const tasks = urls.map((url) =>
        limit(async () => {
          let status: number | null = null;
          let finalUrl: string | null = null;
          const ctx = await newStealthContext(b);
          const page = await ctx.newPage();
          try {
            const response = await page.goto(url, {
              timeout: 15_000,
              waitUntil: "domcontentloaded",
            });
            status = response?.status() ?? null;
            finalUrl = page.url();
          } catch {
            status = null;
          } finally {
            await ctx.close();
          }
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
