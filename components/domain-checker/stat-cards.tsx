"use client";
import StatCard from "@/components/domain-checker/stat-card";
import { useDomainCheckerStore } from "@/store/domain-checker";

const statConfig = [
  { statusLabel: "2xx", statusCode: "ok" },
  { statusLabel: "Redirect", statusCode: "redirect" },
  { statusLabel: "4xx/5xx", statusCode: "error" },
  { statusLabel: "Network Error", statusCode: "network-error" },
] as const;

const StatCards = () => {
  const counts = useDomainCheckerStore((s) => s.counts);

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {statConfig.map(({ statusLabel, statusCode }) => (
        <StatCard
          key={statusCode}
          statusLabel={statusLabel}
          statusCode={statusCode}
          domainCount={counts[statusCode]}
        />
      ))}
    </div>
  );
};

export default StatCards;
