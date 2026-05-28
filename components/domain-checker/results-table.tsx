"use client";
import ResultItem from "@/components/domain-checker/result-item";
import { useDomainCheckerStore } from "@/store/domain-checker";

const ResultsTable = () => {
  const results = useDomainCheckerStore((s) => s.results);

  if (results.length === 0) return null;

  return (
    <ul className="w-full mt-4 space-y-2">
      {results.map((result, index) => (
        <ResultItem
          key={index}
          url={result.url}
          statusCode={result.category}
          status={result.status}
        />
      ))}
    </ul>
  );
};

export default ResultsTable;
