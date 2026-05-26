import StatCard from "@/components/domain-checker/stat-card";

const StatCards = () => {
  const status = [
    {
      statusLabel: "2xx",
      statusCode: "ok",
      domainCount: 0,
    },
    {
      statusLabel: "3xx",
      statusCode: "redirect",
      domainCount: 0,
    },
    {
      statusLabel: "4xx/5xx",
      statusCode: "error",
      domainCount: 0,
    },
    {
      statusLabel: "Network Error",
      statusCode: "network-error",
      domainCount: 0,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {status.map((stat, index) => (
        <div key={index}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default StatCards;
