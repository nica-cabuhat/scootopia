"use client";
import InputTabs from "@/components/domain-checker/input-tabs";
import ResultsTable from "@/components/domain-checker/results-table";
import StatCards from "@/components/domain-checker/stat-cards";
import { Button } from "@/components/ui/button";
import { useDomainCheckerStore } from "@/store/domain-checker";

const DomainCheckerContainer = () => {
  const { reset, results } = useDomainCheckerStore();

  return (
    <div className="px-1 overflow-y-auto h-full pb-2 pr-2">
      <div className="flex justify-between items-center pb-6">
        <h2 className="text-3xl font-medium uppercase tracking-wide">
          CPM Bid Guidance
        </h2>
        {results.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground cursor-pointer uppercase tracking-wide"
            onClick={reset}
          >
            Clear History
          </Button>
        )}
      </div>
      <InputTabs />
      <div className="mt-12 space-y-6">
        <StatCards />
        <ResultsTable />
      </div>
    </div>
  );
};

export default DomainCheckerContainer;
