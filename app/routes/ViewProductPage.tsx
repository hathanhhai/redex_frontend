import { ProductView } from "~/components/products/ProductView";
import type { Route } from "./+types/HistoryPage";


export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit Product" }];
}

export default function ViewProductPage() {
  return <ProductView></ProductView>;
}
