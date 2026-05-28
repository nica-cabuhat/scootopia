import InputTabs from "@/components/domain-checker/input-tabs";
import ResultsTable from "@/components/domain-checker/results-table";
import StatCards from "@/components/domain-checker/stat-cards";

const DomainCheckerContainer = () => {
  return (
    <div className="px-1 overflow-y-auto h-full pb-2 pr-2">
      <h2 className="text-3xl font-medium uppercase tracking-wide pb-6">
        CPM Bid Guidance
      </h2>
      <InputTabs />
      <div className="mt-12 space-y-6">
        <StatCards />
        <ResultsTable />
      </div>
    </div>
  );
};

export default DomainCheckerContainer;
