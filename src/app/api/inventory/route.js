import { NextResponse } from "next/server";
import { inventory } from "@/lib/inventory";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 50);

    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const category = searchParams.get("category") || "";
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const maxStockParam = searchParams.get("maxStock");

    const minPrice = minPriceParam !== null ? Number(minPriceParam) : null;
    const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : null;
    const maxStock = maxStockParam !== null ? Number(maxStockParam) : null;
    const sort = searchParams.get("sort") || "";
    const exportData = searchParams.get("export") === "true";

    let filteredInventory = [...inventory];

    if (search) {
        filteredInventory = filteredInventory.filter(
            (product) =>
                product.productName.toLowerCase().includes(search) ||
                product.sku.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search)
        );
    }

    if (category) {
        filteredInventory = filteredInventory.filter(
            (product) => product.category === category
        );
    }

    if (minPrice !== null && !Number.isNaN(minPrice)) {
        filteredInventory = filteredInventory.filter(
            (product) => product.price >= minPrice
        );
    }

    if (maxPrice !== null && !Number.isNaN(maxPrice)) {
        filteredInventory = filteredInventory.filter(
            (product) => product.price <= maxPrice
        );
    }

    if (maxStock !== null && !Number.isNaN(maxStock)) {
        filteredInventory = filteredInventory.filter(
            (product) => product.stockQuantity <= maxStock
        );
    }

    if (sort === "price-asc") {
        filteredInventory.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
        filteredInventory.sort((a, b) => b.price - a.price);
    }

    if (sort === "stock-asc") {
        filteredInventory.sort((a, b) => a.stockQuantity - b.stockQuantity);
    }

    if (sort === "stock-desc") {
        filteredInventory.sort((a, b) => b.stockQuantity - a.stockQuantity);
    }

    const total = filteredInventory.length;
    const totalPages = Math.ceil(total / limit);

    const products = exportData
        ? filteredInventory
        : filteredInventory.slice(
            (page - 1) * limit,
            (page - 1) * limit + limit
        );

    return NextResponse.json({
        data: products,
        pagination: {
            page,
            limit,
            total,
            totalPages,
        },
    });
}
