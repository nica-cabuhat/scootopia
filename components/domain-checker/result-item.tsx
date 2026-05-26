import { Card } from "@/components/ui/card";
import { colorMap } from "@/components/domain-checker/stat-card";

type ResultItemProps = {
  url: string;
  statusCode: string;
};

const ResultItem = ({ url, statusCode }: ResultItemProps) => {
  return (
    <li className="w-full">
      <Card className="w-full flex flex-row justify-between items-center space-x-4 p-4 ring-scootopia-gray-80 bg-scootopia-gray-100 rounded-md">
        <span>{url}</span>
        <span className={colorMap[statusCode] || "text-gray-500"}>
          {statusCode}
        </span>
      </Card>
    </li>
  );
};

export default ResultItem;
