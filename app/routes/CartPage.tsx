import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/stores/hooks";
import { CartList } from "~/components/cart/CartList";

export default function CartPage() {
  const items = useAppSelector((state) => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items.length, navigate]);

  if (items.length === 0) {
    return null;
  }

  return <CartList />;
}
