import { Link, NavLink } from "react-router";

export function History() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <NavLink to="/" >
        <h1 className="py-5 text-red-500">History</h1>
      </NavLink>
    </main>
  );
}
