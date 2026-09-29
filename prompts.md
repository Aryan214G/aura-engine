# AI Prompts — Aura Engine

## 1.

I'm starting a new Next.js project for Sprint 18. I've been using JavaScript/JSX in my previous projects, so i want to continue with that instead of TypeScript. What options should i choose when setting up the project?

## 2.

The basic Next.js project is working now. I want to keep the project structure simple, but i'll eventually need components, hooks, API/data logic and some utility code. How would you structure the src folder for this?

## 3.

I need some development inventory data for the project. The assignment is based around 50,000 SKUs, so i want to generate some sample products locally with fields like product name, SKU, category, price, cost, stock quantity, reorder level and last updated. Whats a simple way to set that up?

## 4.

I want to start working on the inventory API. Since the assignment requires server-side pagination, i want the API to return only 50 products per request and also provide the pagination information needed by the frontend. How should i approach the /api/inventory route?

## 5.

The basic inventory endpoint is working. I now need to handle the search, category, price, stock and sorting requirements from the data grid. What would be a good way to add those query parameters while keeping the pagination working correctly?

## 6.

I'm testing /api/inventory?search=Electronics and i'm getting an empty result even though there are Electronics products in my generated data. Can you help me figure out whats wrong with the current filtering logic? I also want to make sure the sorting isnt modifying the original inventory data.
