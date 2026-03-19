import { ProductList } from "~/components/products/ProductList";
import type { Route } from "./+types/HistoryPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products " },
  ];
}

export default function ProductPage() {
  return <ProductList />;
}
