import api from "~/utilities/axios";

export type HomeProduct = {
  id: number;
  name: string;
  price: number;
  info: string;
  description: string;
  status: string;
  created_at?: string;
};

export const homeService = {
  async listActiveProducts() {
    const response = await api.get<HomeProduct[]>("/api/active-products");
    return response.data;
  },
};
