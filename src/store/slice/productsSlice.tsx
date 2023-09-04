import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  errorMessage: null,
  products: [],
};

const productsSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    fetchProducts(state) {
      state.loading = true;
    },
    fetchProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailed(state, action) {
      state.loading = false;
      state.errorMessage = action.payload.error;
    },
  },
});

export const { fetchProducts, fetchProductsSuccess, fetchProductsFailed } =
  productsSlice.actions;
export default productsSlice.reducer;
