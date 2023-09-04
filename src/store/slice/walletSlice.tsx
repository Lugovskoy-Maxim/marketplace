import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dollars: 1000, // Начальное количество долларов
  coins: 0, // Начальное количество монет
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    //  пополнение долларов
    addDollars: (state, action) => {
      state.dollars += action.payload;
    },
    // покупка за доллоры
    buyToDollars: (state, action) => {
      state.dollars -= action.payload;
    },
    //покупка за коины
    buyToCoin: (state, action) => {
      state.coins -= action.payload;
    },
    // покупка монет за доллары
    buyCoins: (state, action) => {
      const amountInDollars = action.payload;
      if (state.dollars >= amountInDollars) {
        const coinsPerDollar = amountInDollars; //  1 доллар = 1 монета
        state.dollars -= coinsPerDollar;
        state.coins += coinsPerDollar;
      }
    },
  },
});

export const { addDollars, buyCoins, buyToDollars, buyToCoin } =
  walletSlice.actions;

export default walletSlice.reducer;
