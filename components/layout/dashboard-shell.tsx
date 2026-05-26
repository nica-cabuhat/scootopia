import React from "react";

const DashboardShell = () => {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 h-full">
      <div className="h-full col-span-9 bg-amber-50">CPM Bid Guidance</div>
      <div className="h-full col-span-3 bg-blue-50">Volume Calculator</div>
    </div>
  );
};

export default DashboardShell;
