import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "~/stores/hooks";
import { removeItem, setQuantity } from "~/stores/CartStore";
import { useNavigate } from "react-router";

export function CartList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (productId: number) => {
    dispatch(removeItem(productId));
  };

  const handleChangeQty = (productId: number, qty: number) => {
    dispatch(setQuantity({ productId, quantity: qty }));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h4" component="h1">
          Cart
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Continue shopping
        </Button>
      </div>

      {items.length === 0 ? (
        <Paper className="p-4">
          <Typography>No items in cart.</Typography>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{new Intl.NumberFormat("de-DE").format(item.price)}</TableCell>
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="small" variant="outlined" onClick={() => handleChangeQty(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button size="small" variant="outlined" onClick={() => handleChangeQty(item.productId, item.quantity + 1)}>
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell align="right">{new Intl.NumberFormat("de-DE").format(item.price * item.quantity)}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" color="error" size="small" onClick={() => handleRemove(item.productId)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider className="my-4" />
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center gap-2">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h5" fontWeight={700}>
                {new Intl.NumberFormat("de-DE").format(total)}
              </Typography>
            </div>
            <Button variant="contained" color="primary" onClick={() => navigate("/checkout")}>
              Buy
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
