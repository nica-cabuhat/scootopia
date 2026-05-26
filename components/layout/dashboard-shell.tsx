import DomainCheckerContainer from "@/components/domain-checker/domain-checker-container";
import React from "react";

const DashboardShell = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-[1fr] gap-4 p-4 h-full overflow-hidden">
      <div className="h-full min-h-0 col-span-9 overflow-y-auto">
        <DomainCheckerContainer />
      </div>
      <div className="h-full min-h-0 overflow-hidden col-span-3 flex flex-col justify-between items-center ">
        <div className="rounded-lg shadow  w-full h-full">
          <h3 className="font-bold text-lg">Volume Calculator</h3>
          <p>Calculate the volume of your items.</p>
        </div>
        <div className="rounded-lg shadow w-full h-full">
          <h3 className="font-bold text-lg">Volume Calculator</h3>
          <p>Calculate the volume of your items.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;
