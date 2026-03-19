import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/stores/hooks";
import { clearCart } from "~/stores/CartStore";
import { cartService } from "~/services/cartService";

export function Checkout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      setError("Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        items,
        total,
      };
      await cartService.create(payload);
      dispatch(clearCart());
      alert(`Order placed! Total ${new Intl.NumberFormat("de-DE").format(total)}`);
      navigate("/");
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error("Order submission error:", err);
    } finally {
      setLoading(false);
    }

  };

  if (items.length === 0) {
    return (
      <Box className="p-4">
        <Typography variant="h5">Your cart is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box className="p-4">
      <Typography variant="h4" className="mb-4">Checkout</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 500 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
        <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth />
        <TextField label="Address" name="address" value={form.address} onChange={handleChange} multiline rows={3} fullWidth />
        <Typography>Total: {new Intl.NumberFormat("de-DE").format(total)}</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Processing..." : "Buy"}
        </Button>
      </Box>
    </Box>
  );
}
