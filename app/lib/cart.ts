// app/lib/cart.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store"; 

type CartItem = {
  id: number;
  quantity: number;
  email: string;
};

type CartState = CartItem[];

const initialState: CartState = [];

const cartSlice = createSlice({
  name: "quantityChange", 
  initialState,
  reducers: {
    // Adding to cart: if same id+email exists, updating quantity
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity, email } = action.payload;
      const existing = state.find((i) => i.id === id && i.email === email);
      if (existing) {
        existing.quantity = (quantity);
      } else {
        state.push({ id, quantity, email });
      }
    },
    
    setCartItems: (state, action) => {
    state= action.payload; // Replace with DB array
    return state;
      },
 
    removeFromCart: (state, action: PayloadAction<{ id: number; email: string }>) => {
      const { id, email } = action.payload;
      return state.filter((i) => !(i.id === id && i.email === email));
    },

    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, setCartItems, removeFromCart, clearCart } = cartSlice.actions;

// selector: total items (sum of quantities)
export const selectCartCount = (state: RootState) =>{
const tot=  state.abc.length;
return tot;
}

export default cartSlice.reducer;
