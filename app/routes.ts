import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    
    index("routes/home.tsx"),
    route("history", "routes/HistoryPage.tsx"),
    ...prefix("products", [
    index("routes/ProductPage.tsx"),
    route("add", "routes/AddProductPage.tsx"),
    route("view/:id", "routes/ViewProductPage.tsx"),
    route("edit/:id", "routes/EditProductPage.tsx"),
  ]),
  route("cart", "routes/CartPage.tsx"),
    route("checkout", "routes/CheckoutPage.tsx"),
] satisfies RouteConfig;
