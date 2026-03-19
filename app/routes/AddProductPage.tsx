import { ProductList } from "~/components/products/ProductList";
import type { Route } from "./+types/HistoryPage";
import { ProductAdd } from "~/components/products/ProductAdd";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Add Product" },
  ];
}

export default function AddProductPage() {
  return <ProductAdd></ProductAdd>;
}
