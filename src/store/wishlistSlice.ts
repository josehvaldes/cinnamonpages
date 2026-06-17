import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../types/Product";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        p => p.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        p => p.id !== action.payload
      );
    },

    toggleItem(state, action: PayloadAction<Product>) {
        const exists = state.items.some(
            p => p.id === action.payload.id
        );

        if (exists) {
            state.items = state.items.filter(
                p => p.id !== action.payload.id
            );
        } else {
            state.items.push(action.payload);
        }
    }
  },
});

export const { addItem, removeItem, toggleItem } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;