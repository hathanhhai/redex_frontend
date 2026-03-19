import type { Route } from "./+types/HistoryPage";

import { ProductEdit } from "~/components/products/ProductEdit";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit Product" }];
}

export default function EditProductPage() {
  return <ProductEdit></ProductEdit>;
}
