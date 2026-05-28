import { Card } from "@/components/ui/card";
import { colorMap } from "@/components/domain-checker/stat-card";

type ResultItemProps = {
  url: string;
  statusCode: string;
  status: number | null;
};

const ResultItem = ({ url, statusCode, status }: ResultItemProps) => {
  return (
    <li className="w-full">
      <Card className="w-full flex flex-row justify-between items-center space-x-4 p-4 ring-scootopia-gray-80 bg-scootopia-gray-100 rounded-md">
        <span className="truncate">{url}</span>
        <span className={`shrink-0 font-mono ${colorMap[statusCode] ?? "text-gray-500"}`}>
          {status ?? "ERR"} · {statusCode}
        </span>
      </Card>
    </li>
  );
};

export default ResultItem;
