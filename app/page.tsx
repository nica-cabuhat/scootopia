import DashboardShell from "@/components/layout/dashboard-shell";
import Header from "@/components/layout/header";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 min-h-0 overflow-hidden">
        <DashboardShell />
      </main>
    </div>
  );
}
