import InputTabs from "@/components/domain-checker/input-tabs";
import PasteInput from "@/components/domain-checker/paste-input";
import ResultsTable from "@/components/domain-checker/results-table";
import StatCards from "@/components/domain-checker/stat-cards";
import { StatusIndicator } from "next/dist/next-devtools/dev-overlay/components/devtools-indicator/status-indicator";

const DomainCheckerContainer = () => {
  return (
    <div className="px-1 overflow-y-auto h-full pb-2 pr-2">
      <h2 className="text-3xl font-medium uppercase tracking-wide pb-6">
        CPM Bid Guidance
      </h2>
      <InputTabs />
      <StatCards />
      <ResultsTable />
    </div>
  );
};

export default DomainCheckerContainer;
