import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartSlice from './slice/cartSlice';
import productsSlice from './slice/productsSlice';
import walletSlice from './slice/walletSlice';

const rootReducer = combineReducers({
  data: productsSlice,
  wallet: walletSlice,
  carts: cartSlice,
});

// Создайте функцию для настройки Redux Store
const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

const wrapper = createWrapper(makeStore);

export default wrapper;
export type IRootState = ReturnType<typeof rootReducer>;
