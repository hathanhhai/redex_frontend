import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartId?: number;
  items: CartItem[];
}

const initialState: CartState = {
  cartId: undefined,
  items: [],
};

interface AddToCartPayload {
  productId: number;
  name: string;
  price: number;
  quantity?: number;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<number>) => {
      state.cartId = action.payload;
    },
    addItem: (state, action: PayloadAction<AddToCartPayload>) => {
      const { productId, name, price, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.productId === productId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId, name, price, quantity });
      }
    },
    setQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCartId, addItem, setQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
