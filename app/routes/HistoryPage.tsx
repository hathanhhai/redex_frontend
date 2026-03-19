import type { Route } from "./+types/HistoryPage";
import { CartHistory } from "~/components/cart/CartHistory";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "History " },
  ];
}

export default function Home() {
  return <CartHistory />;
}
