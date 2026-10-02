"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/inventory/analytics");

        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <section className="mb-8">
        <p className="text-sm text-zinc-600">Loading analytics...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-zinc-900">
        Inventory Analytics
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Total SKUs</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            {analytics.kpis.totalSkus.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Total Inventory Value</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            $
            {analytics.kpis.totalInventoryValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5">
          <p className="text-sm text-zinc-500">Out of Stock Items</p>
          <p className="mt-2 text-2xl font-semibold text-zinc-900">
            {analytics.kpis.outOfStockItems.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900">
          Top 10 Lowest-Stock Products
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={analytics.lowestStockProducts}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis
                type="category"
                dataKey="productName"
                width={150}
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Bar
                dataKey="stockQuantity"
                name="Stock"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5">
        <h3 className="mb-4 text-lg font-semibold text-zinc-900">
          Inventory Valuation by Category
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics.inventoryValueByCategory}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {analytics.inventoryValueByCategory.map((entry) => (
                  <Cell key={entry.category} />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
