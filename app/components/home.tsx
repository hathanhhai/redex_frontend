import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/stores/hooks";
import { addItem } from "~/stores/CartStore";
import { homeService } from "~/services/homeService";

type Product = {
  id: number;
  name: string;
  price: number;
  info: string;
  description: string;
  created_at?: string;
};



function formatPrice(value: number | string) {
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return new Intl.NumberFormat("de-DE").format(number);
}

export function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<number | null>(null);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchProducts = async () => {
      try {
        const data = await homeService.listActiveProducts();
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    void fetchProducts();
  }, []);

  const redirectView = (id: number) => () => {
    navigate(`/products/view/${id}`);
  };

  const handleAddToCart = (product: Product) => {
    setAddingId(product.id);
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
      }),
    );
    window.setTimeout(() => {
      setAddingId(null);
    }, 150);
  };

  return (
    <div className="p-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        {/* <div className="text-sm font-medium">Cart items: {cartItemCount}</div> */}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : products.length === 0 ? (
        <div>No products available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product.id} className="border rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
              <h2 onClick={redirectView(product.id)} className="font-semibold text-lg underline text-blue-500 cursor-pointer">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm mb-2">{product.info}</p>
              <div className="text-xl font-bold text-blue-600 mb-2 ">{formatPrice(product.price)}</div>

              <div className="mt-auto flex gap-2 z-20">
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  disabled={addingId === product.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    void handleAddToCart(product);
                  }}
                >
                  {addingId === product.id ? "Adding..." : "Add to Cart"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
