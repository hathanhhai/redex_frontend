import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

import { NavLink } from "react-router";
import { productService } from "~/services/productService";
import type { Product } from "~/services/productService";

function formatCreatedAt(dateStr: string) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

function formatPrice(value: number | string) {
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return new Intl.NumberFormat("de-DE").format(number);
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await productService.list();
    setProducts(data || []);
  };

  const handleDelete = async (id: number) => {
    try {
      await productService.delete(id);
      fetchProducts();
      // setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Could not delete product", error);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="my-5 font-bold text-2xl">Product List</h2>
        <NavLink to="/products/add">
          <Button variant="outlined" color="success">
            ADD
          </Button>
        </NavLink>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Into</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {product.id}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{formatPrice(product.price)}</TableCell>
                  <TableCell align="right">{product.info}</TableCell>
                  <TableCell align="right">{product.description}</TableCell>
                  <TableCell align="right">
                    {product.status === "active" ? (
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded">Active</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded">Inactive</span>
                    )}
                  </TableCell>
                  <TableCell align="right">{formatCreatedAt(product.created_at)}</TableCell>
                  <TableCell align="center" className="gap-3">
                    <NavLink to={`/products/edit/${product.id}`}>
                      <Button style={{ marginRight: "8px" }} className=" mr-3" variant="outlined" color="primary">
                        Edit
                      </Button>
                    </NavLink>
                    {product.status === "active" ? (
                    <Button
                      style={{ marginRight: "8px" }}
                      className=" mr-2"
                      variant="outlined"
                      color="error"
                      onClick={() => void handleDelete(product.id)}
                    >
                      Delete
                    </Button>) : ''}


                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
