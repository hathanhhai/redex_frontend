import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { cartService } from "~/services/cartService";
import type { Cart } from "~/services/cartService";


function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB");
}

function formatPrice(value: number | string) {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("de-DE").format(num);
}

function statusColor(status: string | undefined) {
  switch (status) {
    case "confirmed":
      return "info";
    case "completed":
      return "success";
    case "waiting":
      return "warning";
    default:
      return "default";
  }
}

function statusLabel(status: string | undefined) {
  if (status === "confirmed") return "Confirmed";
  if (status === "completed") return "Completed";
  if (status === "waiting") return "Waiting";
  return "Unknown";
}

export function CartHistory() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingCartId, setUpdatingCartId] = useState<number | null>(null);
  const [deletingCartId, setDeletingCartId] = useState<number | null>(null);

  const fetchHistory = async () => {
    try {
      const data = await cartService.list();
      setCarts(data || []);
    } catch (err) {
      console.error("Could not fetch cart history", err);
      setError("Could not load history. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchHistory();
  }, []);

  const updateStatus = async (cartId: number) => {
    setUpdatingCartId(cartId);
    try {
      await cartService.updateStatus(cartId);
      void fetchHistory();
    } catch (err) {
      console.error("Could not update cart status", err);
      setError("Failed to update status.");
    } finally {
      setUpdatingCartId(null);
    }
  };

  const openCartItems = (cart: Cart) => {
    setSelectedCart(cart);
  };

  const closeCartItems = () => {
    setSelectedCart(null);
  };

  const deleteCart = async (cartId: number) => {
    setDeletingCartId(cartId);
    try {
      await cartService.delete(cartId);
      void fetchHistory();
      if (selectedCart?.id === cartId) {
        setSelectedCart(null);
      }
    } catch (err) {
      console.error("Could not delete cart", err);
      setError("Failed to delete cart.");
    } finally {
      setDeletingCartId(null);
    }
  };

  if (loading) {
    return <Typography sx={{ p: 4 }}>Loading cart history...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <div className="p-4">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Order History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Items</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="right">Update Status</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">View Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No orders yet.
                </TableCell>
              </TableRow>
            ) : (
              carts.map((cart) => (
                <TableRow key={cart.id}>
                  <TableCell>{cart.id}</TableCell>
                  <TableCell onClick={() => openCartItems(cart)} style={{ cursor: "pointer" }}>
                    <span className="font-bold  text-blue-500 underline"> {cart.name}</span>
                  </TableCell>
                  <TableCell>{cart.email}</TableCell>
                  <TableCell>{cart.address}</TableCell>
                  <TableCell align="right">{formatPrice(cart.total_price)}</TableCell>
                  <TableCell align="right">{cart.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0}</TableCell>
                  <TableCell align="center">
                    <Chip label={statusLabel(cart.status)} color={statusColor(cart.status)} size="small" />
                  </TableCell>
                  <TableCell align="right">{formatDate(cart.created_at)}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={cart.status === "completed" || updatingCartId === cart.id || deletingCartId === cart.id}
                      onClick={() => void updateStatus(cart.id)}
                    >
                      {updatingCartId === cart.id ? "Updating..." : cart.status === "waiting" ? "Confirm" : cart.status === "confirmed" ? "Complete" : "Done"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      disabled={deletingCartId === cart.id || updatingCartId === cart.id}
                      onClick={() => void deleteCart(cart.id)}
                    >
                      {deletingCartId === cart.id ? "Deleting..." : "Delete"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" size="small" onClick={() => openCartItems(cart)}>
                      View Items
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {carts.length > 0 && (
        <div className="mt-3">
          <Typography variant="body2" color="text.secondary">
            Showing {carts.length} orders (newest first).
          </Typography>
        </div>
      )}

      <Dialog open={Boolean(selectedCart)} onClose={closeCartItems} maxWidth="sm" fullWidth>
        <DialogTitle>Cart Items</DialogTitle>
        <DialogContent>
          {selectedCart ? (
            <List>
              {selectedCart.items && selectedCart.items.length > 0 ? (
                selectedCart.items.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={item.product?.name ?? `Product #${item.product_id}`}
                      secondary={`Qty: ${item.quantity} · Price: ${formatPrice(item.price)} · Subtotal: ${formatPrice(item.price * item.quantity)}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography sx={{ p: 1 }}>No items in this cart.</Typography>
              )}
            </List>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCartItems}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
