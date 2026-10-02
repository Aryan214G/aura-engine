"use client";

import { useEffect, useState } from "react";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInventory() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/inventory?page=${page}&limit=50`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }

        const result = await response.json();

        setProducts(result.data);
        setPagination(result.pagination);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, [page]);

  const goToPreviousPage = () => {
    setPage((current) => Math.max(current - 1, 1));
  };

  const goToNextPage = () => {
    setPage((current) =>
      Math.min(current + 1, pagination?.totalPages ?? current)
    );
  };

  if (loading) {
    return (
      <div className="rounded-lg border bg-white p-8 text-center">
        Loading inventory...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm text-zinc-900">
            <thead className="sticky top-0 bg-zinc-100 text-zinc-900">
              <tr className="border-b text-left">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 text-right font-medium">Stock</th>
                <th className="px-4 py-3 text-right font-medium">
                  Reorder Level
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b last:border-b-0 hover:bg-zinc-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {product.productName}
                  </td>

                  <td className="px-4 py-3 text-zinc-600">
                    {product.sku}
                  </td>

                  <td className="px-4 py-3">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs">
                      {product.category}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    ${product.price.toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {product.stockQuantity}
                  </td>

                  <td className="px-4 py-3 text-right">
                    {product.reorderLevel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border bg-white px-4 py-3">
        <p className="text-sm text-zinc-600">
          Showing {(page - 1) * 50 + 1}–
          {Math.min(page * 50, pagination?.total ?? 0)} of{" "}
          {pagination?.total ?? 0} products
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousPage}
            disabled={page === 1}
            className="rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-zinc-600">
            Page <span className="font-medium text-zinc-900">{page}</span>{" "}
            of {pagination?.totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={page === pagination?.totalPages}
            className="rounded-md border px-3 py-2 text-sm font-medium transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
