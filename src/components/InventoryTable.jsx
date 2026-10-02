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

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Product</th>
              <th className="p-3">SKU</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Reorder Level</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-3">{product.productName}</td>
                <td className="p-3">{product.sku}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3">{product.stockQuantity}</td>
                <td className="p-3">{product.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setPage((current) => current - 1)}
          disabled={page === 1}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {pagination?.page} of {pagination?.totalPages}
        </span>

        <button
          onClick={() => setPage((current) => current + 1)}
          disabled={page === pagination?.totalPages}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}