const categories = [
  "Electronics",
  "Furniture",
  "Clothing",
  "Grocery",
  "Automotive",
  "Sports",
  "Beauty",
  "Home",
];

function generateProduct(index) {
  const category = categories[index % categories.length];

  const price = Number((10 + ((index * 37) % 2000) + Math.random() * 100).toFixed(2));
  const cost = Number((price * (0.5 + ((index % 20) / 100))).toFixed(2));

  return {
    id: index + 1,
    productName: `${category} Product ${index + 1}`,
    sku: `SKU-${String(index + 1).padStart(6, "0")}`,
    category,
    price,
    cost,
    stockQuantity: (index * 17) % 500,
    reorderLevel: 20 + (index % 50),
    lastUpdated: new Date(
      Date.now() - (index % 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
  };
}

export const inventory = Array.from({ length: 50000 }, (_, index) =>
  generateProduct(index)
);

export { categories };