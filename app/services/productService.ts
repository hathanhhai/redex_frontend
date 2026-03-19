import api from "~/utilities/axios";

export type Product = {
  id: number;
  name: string;
  price: number;
  info: string;
  description: string;
  status: string;
  created_at: string;
};

export type ProductService = typeof productService;

export const productService = {
  async list() {
    const response = await api.get<Product[]>("/api/products");
    return response.data;
  },

  async delete(id: number) {
    const response = await api.delete(`/api/product/${id}`);
    return response.data;
  },
};
