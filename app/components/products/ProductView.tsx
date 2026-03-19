import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import axios from "../../utilities/axios";

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

function formatCreatedAt(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

export function ProductView() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [id]);

  if (loading) {
    return <div>Loading product...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h4">Product details</Typography>
        <NavLink to="/">
          <Button variant="outlined">Back</Button>
        </NavLink>
      </div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{product.name}</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>{product.info}</Typography>
          <Typography variant="h6" color="primary">Price: {formatPrice(product.price)} </Typography>
          <Typography variant="body1" className="mt-2">{product.description}</Typography>
          <Typography variant="caption" color="textSecondary" className="mt-2 block">Created: {formatCreatedAt(product.created_at)}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
