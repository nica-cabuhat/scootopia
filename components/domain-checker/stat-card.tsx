import { Card } from "@/components/ui/card";

type StatCardProps = {
  statusLabel: string;
  statusCode: string;
  domainCount: number;
};

export const colorMap: Record<string, string> = {
  ok: "text-green-500",
  redirect: "text-yellow-500",
  error: "text-red-500",
  "network-error": "text-orange-500",
};

const StatCard = ({ statusLabel, statusCode, domainCount }: StatCardProps) => {
  return (
    <Card className="w-full flex flex-col justify-center space-y-1 p-4 ring-scootopia-gray-80 bg-scootopia-gray-100 rounded-md">
      <div
        className={
          "text-5xl font-light" +
          " " +
          (colorMap[statusCode] || "text-gray-500")
        }
      >
        {domainCount}
      </div>
      <div className="space-x-2">
        <span className="text-scootopia-gray-10">{statusLabel}</span>
        <span className="text-scootopia-gray-50">({statusCode})</span>
      </div>
    </Card>
  );
};

export default StatCard;
