import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import axios from "../../utilities/axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import { NavLink } from "react-router";

export function ProductAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    info: "",
    description: "",
    status: true,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const save = await axios.post("/api/product", {
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
    navigate("/products");    } catch (err) {
      console.error(err);
      setErrors(["Unable to save product."]);
    } finally {
      setIsSaving(false);
    }  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="my-5 font-bold text-2xl">Add Product</h2>
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
        <TextField size="medium" label="Name" name="name" value={formData.name} onChange={handleChange} variant="outlined" />
        <TextField size="medium" label="Price" name="price" type="number" value={formData.price} onChange={handleChange} variant="outlined" />
        <TextField size="medium" label="Info" name="info" value={formData.info} onChange={handleChange} variant="outlined" />
        <TextField rows={4} maxRows={10} multiline size="medium" label="Description" name="description" value={formData.description} onChange={handleChange} variant="outlined" />
        <FormControlLabel control={<Checkbox checked={formData.status} onChange={handleChange} name="status" color="primary" />} label={formData.status ? "Active" : "Inactive"} />
        <Button type="submit" variant="contained" color="success" disabled={isSaving}>
          {isSaving ? "Saving..." : "Submit"}
        </Button>
      </Box>
    </div>
  );
}
