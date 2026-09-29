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

    let filteredInventory = [...inventory];

    // Global search
    if (search) {
        filteredInventory = filteredInventory.filter(
            (product) =>
                product.productName.toLowerCase().includes(search) ||
                product.sku.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search)
        );
    }

    // Category filter
    if (category) {
        filteredInventory = filteredInventory.filter(
            (product) => product.category === category
        );
    }

    // Price range
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

    // Stock level
    if (maxStock !== null && !Number.isNaN(maxStock)) {
        filteredInventory = filteredInventory.filter(
            (product) => product.stockQuantity <= maxStock
        );
    }

    // Sorting
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

    const startIndex = (page - 1) * limit;
    const products = filteredInventory.slice(
        startIndex,
        startIndex + limit
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