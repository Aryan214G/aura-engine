import { NextResponse } from "next/server";
import { inventory } from "@/lib/inventory";

export async function GET() {
  const totalSkus = inventory.length;

  const totalInventoryValue = inventory.reduce(
    (total, product) => total + product.price * product.stockQuantity,
    0
  );

  const outOfStockItems = inventory.filter(
    (product) => product.stockQuantity === 0
  ).length;

  const lowestStockProducts = [...inventory]
    .sort((a, b) => a.stockQuantity - b.stockQuantity)
    .slice(0, 10)
    .map((product) => ({
      productName: product.productName,
      stockQuantity: product.stockQuantity,
    }));

  const categoryValues = {};

  for (const product of inventory) {
    if (!categoryValues[product.category]) {
      categoryValues[product.category] = 0;
    }

    categoryValues[product.category] +=
      product.price * product.stockQuantity;
  }

  const inventoryValueByCategory = Object.entries(categoryValues).map(
    ([category, value]) => ({
      category,
      value: Number(value.toFixed(2)),
    })
  );

  return NextResponse.json({
    kpis: {
      totalSkus,
      totalInventoryValue: Number(totalInventoryValue.toFixed(2)),
      outOfStockItems,
    },
    lowestStockProducts,
    inventoryValueByCategory,
  });
}
