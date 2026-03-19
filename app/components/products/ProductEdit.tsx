import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "../../utilities/axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { NavLink } from "react-router";

export function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    info: "",
    description: "",
    status: true,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!id || loadedRef.current) return;
    loadedRef.current = true;

    const load = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/product/${id}`);
        const product = response.data;
        setFormData({
          name: product?.name ?? "",
          price: String(product?.price ?? ""),
          info: product?.info ?? "",
          description: product?.description ?? "",
          status: product?.status === "active",
        });
      } catch (err) {
        console.error("Unable to load product for edit", err);
        setErrors(["Unable to load product details."]);
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!id) {
      setErrors(["Invalid product ID"]);
      return;
    }
    setIsSaving(true);

    try {
      const save = await axios.put(`/api/product/${id}`, {
        ...formData,
        price: Number(formData.price),
        status: formData.status ? "active" : "inactive",
      });

      if (save.data?.errorLists) {
        const errorsArray = Object.values(save.data.errorLists as Record<string, unknown>)
          .flatMap((value) => (Array.isArray(value) ? value : [value]))
          .map((value) => String(value));
        setErrors(errorsArray);
        return;
      }
      navigate("/products");
    } catch (err) {
      console.error(err);
      setErrors(["Unable to update product."]);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10 text-lg">Loading product...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="my-5 font-bold text-2xl">Edit Product</h2>
        <NavLink to="/products">
          <Button variant="outlined" color="secondary">
            Back
          </Button>
        </NavLink>
      </div>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 400,
          margin: "auto",
        }}
      >
        <ul>
          {errors.map((error, index) => (
            <li key={index} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
        <TextField size="medium" label="Name" name="name" value={formData.name} onChange={handleChange} variant="outlined"  />
        <TextField size="medium" label="Price" name="price" type="number" value={formData.price} onChange={handleChange} variant="outlined" />
        <TextField size="medium" label="Info" name="info" value={formData.info} onChange={handleChange} variant="outlined" />
        <TextField rows={4} maxRows={10} multiline size="medium" label="Description" name="description" value={formData.description} onChange={handleChange} variant="outlined" />
        <FormControlLabel
          control={<Checkbox checked={formData.status} onChange={handleChange} name="status" color="primary" />}
          label={formData.status ? "Active" : "Inactive"}
        />
        <Button type="submit" variant="contained" color="primary" disabled={isSaving}>
          {isSaving ? "Saving..." : "Update"}
        </Button>
      </Box>
    </div>
  );
}
