import api from "~/utilities/axios";

export type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    id: number;
    name: string;
    price: number;
  };
};

export type Cart = {
  id: number;
  name: string;
  email: string;
  address: string;
  total_price: number;
  status?: string;
  created_at: string;
  items?: CartItem[];
};

export const cartService = {
  async list() {
    const response = await api.get<Cart[]>("/api/carts");
    return response.data;
  },

  async updateStatus(cartId: number) {
    const response = await api.put(`/api/cart/${cartId}/status`);
    return response.data;
  },

  async delete(cartId: number) {
    const response = await api.delete(`/api/cart/${cartId}`);
    return response.data;
  },

  async create(formData: { name: string; email: string; address: string; total: number; items: Array<{ productId: number; quantity: number }> }) {
    const response = await api.post("/api/cart", formData);
    return response.data;
  },
};
