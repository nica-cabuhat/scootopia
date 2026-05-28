import { useState } from "react";

export function useClipboard(resetDelay = 1000) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    } catch {
      // clipboard unavailable
    }
  };

  return { copy, copied };
}
