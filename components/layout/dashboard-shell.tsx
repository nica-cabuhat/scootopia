import DomainCheckerContainer from "@/components/domain-checker/domain-checker-container";
import VolumePanel from "@/components/volume-calculator/volume-panel";
import { Volume } from "lucide-react";
import React from "react";

const DashboardShell = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[1fr] gap-4 p-4 h-full overflow-hidden">
      <div className="h-full min-h-0 col-span-9 overflow-y-auto">
        <DomainCheckerContainer />
      </div>
      <div className="h-full min-h-0 overflow-hidden col-span-3 ">
        <VolumePanel />
      </div>
    </div>
  );
};

export default DashboardShell;
