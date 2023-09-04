import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDollars, buyCoins } from '@/store/slice/walletSlice';
import { IRootState } from '@/store/store';
import { useState } from 'react';
import Layout from '@/layouts/layout';

function Wallet() {
  const dispatch = useDispatch();
  const wallet = useSelector((state: IRootState) => state.wallet);
  const [inputDollarsValue, setInputDollarsValue] = useState(0);
  const [inputCoinValue, setInputCoinValue] = useState(0);

  const handleChangeDollarInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputDollarsValue(parseFloat(e.currentTarget.value));
  };

  function replenishmentDollarCurrency() {
    dispatch(addDollars(inputDollarsValue));
  }

  const handleChangeCoinInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputCoinValue(parseFloat(e.currentTarget.value));
  };

  function swapDollarToCoins() {
    dispatch(buyCoins(inputCoinValue));
  }

  return (
    <Layout>
      <div className="wallet">
        <h1>WALLET</h1>
        <div className="balance-section">
          <p className="balance-text">Баланс</p>
          <div className="balance-info">
            <div className="coin-balance">{wallet.dollars} $</div>
            <div className="coin-balance">{wallet.coins} coins</div>
          </div>
        </div>
        <input
          type="text"
          min="1"
          placeholder="пополнить dollars"
          value={inputDollarsValue}
          onChange={(e) => handleChangeDollarInput(e)}
          className="input-dollar"
        ></input>
        <button
          type="button"
          onClick={() => replenishmentDollarCurrency()}
          className="btn-replenish"
        >
          Пополнить
        </button>
        <input
          type="text"
          min="1"
          placeholder="обменять dollars на coins"
          value={inputCoinValue}
          onChange={(e) => handleChangeCoinInput(e)}
          className="input-coin"
        ></input>
        <button
          type="button"
          onClick={() => swapDollarToCoins()}
          className="btn-swap"
        >
          Обменять
        </button>
      </div>
    </Layout>
  );
}

export default Wallet;
