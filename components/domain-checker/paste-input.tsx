"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { parseUrls } from "@/lib/domain-parser";
import { useDomainChecker } from "@/hooks/use-domain-checker";
import { useDomainCheckerStore } from "@/store/domain-checker";

const PasteInput = () => {
  const [text, setText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const { run } = useDomainChecker();
  const isLoading = useDomainCheckerStore((s) => s.isLoading);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedText(text), 600);
    return () => clearTimeout(timer);
  }, [text]);

  const urls = parseUrls(debouncedText);

  return (
    <div className="space-y-2">
      <Textarea
        className="w-full h-72 resize-none p-4 border border-scootopia-gray-80 bg-scootopia-gray-100 rounded-md focus-visible:border-scootopia-gray-80 focus-visible:ring-0 text-lg font-normal tracking-wide"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste URLs here, one per line..."
      />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          {urls.length} URL{urls.length !== 1 ? "s" : ""} detected
        </span>
        <Button
          className="cursor-pointer uppercase tracking-wide rounded-md"
          variant="default"
          disabled={urls.length === 0 || isLoading}
          onClick={async () => {
            const ok = await run(urls);
            if (ok) { setText(""); setDebouncedText(""); }
          }}
        >
          {isLoading ? "Running…" : "Run"}
        </Button>
      </div>
    </div>
  );
};

export default PasteInput;
