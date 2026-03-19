import type { Route } from "./+types/home";
import { HomePage } from "../components/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Redex" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
  return <HomePage />;
}
