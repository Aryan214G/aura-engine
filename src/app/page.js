import InventoryTable from "@/components/InventoryTable";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-semibold">
        Aura Engine
      </h1>

      <InventoryTable />
    </main>
  );
}