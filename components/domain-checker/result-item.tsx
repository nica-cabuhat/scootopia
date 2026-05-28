"use client";
import { Card } from "@/components/ui/card";
import { colorMap } from "@/components/domain-checker/stat-card";
import { useClipboard } from "@/hooks/use-clipboard";

type ResultItemProps = {
  url: string;
  statusCode: string;
  status: number | null;
};

const ResultItem = ({ url, statusCode, status }: ResultItemProps) => {
  const { copy, copied } = useClipboard();

  return (
    <li className="w-full">
      <Card className="w-full flex flex-row justify-between items-center space-x-4 p-4 ring-scootopia-gray-80 bg-scootopia-gray-100 rounded-md">
        <span
          className="truncate cursor-pointer hover:text-primary transition-colors"
          onClick={() => copy(url)}
          title="Click to copy"
        >
          {copied ? "Copied!" : url}
        </span>
        <span
          className={`shrink-0 font-mono ${colorMap[statusCode] ?? "text-gray-500"}`}
        >
          {status ?? "ERR"} · {statusCode}
        </span>
      </Card>
    </li>
  );
};

export default ResultItem;
