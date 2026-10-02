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

## 7.
The api is working now and im able to get 50 products at a time. Can we make the inventory table look a bit more like an actual enterprise dashboard instead of just a basic html table? Keep it simple for now, we'll add the filters later.

## 8.
The pagination is working but I want to make sure the page controls are proper and easy to use. Can we improve the pagination UI and make sure the next and previous buttons are disabled when they should be?

## 9.
Now I need to add the global search from the sprint requirements. I want an Omnisearch input that searches the inventory through the api, but it should wait around 500ms after I stop typing before making the request. I dont want a request for every key press.

## 10.
The search is working with the api now. Can we make sure changing the search resets the table back to page 1? Otherwise I think it could end up showing an empty page if the new search has fewer results.

## 11.
I also need the category filter from the requirements. Can we add a category dropdown and connect it to the existing inventory api without changing the pagination logic?

## 12.
Can we add the stock level filter next? The requirement says something like showing products with stock below 20, so I want a slider for the max stock value and have it update the inventory results.

## 13.
I need a price range filter too. Whats a simple way to add a minimum and maximum price filter to the table and send those values to the api?

## 14.
The filters are starting to work now. Can we make sure search, category, stock and price filters can be used together and that the pagination still works correctly when multiple filters are active?

## 15.
I need sortable columns for the inventory table. Can we add sorting for things like price and stock and use the sorting options that we already added to the api? I'd like clicking the column to change the sort direction.

## 16.
I need to add the Omnisearch now. The api already supports the search parameter, but I dont want it making a request every time I type a letter. Can we add a 500ms debounce to the search input and also reset the page back to 1 when the search changes?

## 17.
The search is working. I want to add the category filter now using the categories from the inventory data. Can we add a dropdown for it and send the selected category to the api? Also make sure changing the category takes me back to page 1.

## 18.
The category filter is working. Next I need the stock level filter from the requirements. Can we add a slider for the maximum stock quantity and connect it to the maxStock parameter we already have in the api? It should also reset the page when I change it.

## 19.
I'm unable to drag the slider. I can just click at various points on the slider bar to set a value. If I try to drag it, it gets stuck at the next point.

## 20.
The slider drag is working now, but the displayed <= value only changes after I let go of the slider. Can we make that number update while im dragging, without making the api request on every movement?

## 21.
The stock filter is working now. I want to add the price range filter next, with a minimum and maximum price, and send those values to the minPrice and maxPrice parameters that the api already supports. Also make sure changing either price resets the table back to page 1.

## 22.
25. The price state is connected to the api now. Can we add simple minimum and maximum price inputs to the filter area so I can actually use them? Keep the inputs pretty basic for now.

## 23.
The filters are working together now. I want to connect the sorting that we already have in the api to the table next. Can we add a sort state and send it as a query parameter, and make sure changing the sort goes back to page 1?