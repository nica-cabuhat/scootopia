import DashboardShell from "@/components/layout/dashboard-shell";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <main className="flex-1 overflow-hidden">
        <DashboardShell />
      </main>
    </div>
  );
}
