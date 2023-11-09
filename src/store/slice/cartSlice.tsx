import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  discountedPrice: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
    },
    clearCart: (state) => {
      state.items = [];
    },
    minusQuantity: (state, action) => {
      const findIdItem = action.payload;

      const searchItem = state.items.findIndex(
        (item) => item.id === findIdItem.id
      );

      // Проверка на отрицательное значение searchItem и существование элемента, без проверки при значении количества 1 выскочит ошибка (возможно связано с строгим режимом)
      if (
        searchItem !== -1 &&
        state.items[searchItem] &&
        state.items[searchItem].quantity !== undefined
      ) {
        if (state.items[searchItem].quantity === 1) {
          removeFromCart(findIdItem.id);
        } else {
          state.items[searchItem].quantity -= 1;
        }
      } else {
        return;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, minusQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
