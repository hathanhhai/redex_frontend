import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router";
import { useAppSelector } from "~/stores/hooks";

export function Navbar() {
  const cartItemCount = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/"> Home </NavLink>
          </Typography>

          <NavLink to="/history">
            <Button color="inherit">History </Button>
          </NavLink>

          <NavLink to="/products">
            <Button color="inherit">Products </Button>
          </NavLink>
          {cartItemCount > 0 && (
            <NavLink to="/cart">
              <Button color="inherit">Cart ({cartItemCount})</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
