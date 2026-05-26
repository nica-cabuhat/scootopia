import ResultItem from "@/components/domain-checker/result-item";

const ResultsTable = () => {
  const sampleResults = [
    { url: "https://example.com", statusCode: "ok" },
    { url: "https://example.org", statusCode: "redirect" },
    { url: "https://example.net", statusCode: "error" },
    { url: "https://example.edu", statusCode: "network-error" },
  ];

  return (
    <ul className="w-full mt-4 space-y-2">
      {sampleResults.map((result, index) => (
        <ResultItem
          key={index}
          url={result.url}
          statusCode={result.statusCode}
        />
      ))}
    </ul>
  );
};

export default ResultsTable;
