import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import InventoryTable from "@/components/InventoryTable";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 p-8 text-zinc-900">
      <h1 className="mb-6 text-3xl font-semibold">
        Aura Engine
      </h1>

      <AnalyticsDashboard />

      <InventoryTable />
    </main>
  );
}
