import { NextResponse } from "next/server";
import { inventory } from "@/lib/inventory";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const limit = Math.min(Number(searchParams.get("limit")) || 50, 50);

  const total = inventory.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const products = inventory.slice(startIndex, startIndex + limit);

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