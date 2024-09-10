import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDollars, buyCoins } from "@/store/slice/walletSlice";
import { IRootState } from "@/store/store";
import Layout from "@/layouts/layout";
import Head from "next/head";
import style from "../styles/wallet.module.scss";

function Wallet() {
  const dispatch = useDispatch();
  const wallet = useSelector((state: IRootState) => state.wallet);
  const [inputDollarsValue, setInputDollarsValue] = useState<number | ''>('');
  const [inputCoinValue, setInputCoinValue] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChangeDollarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDollarsValue(parseFloat(e.target.value) || '');
  };

  const handleChangeCoinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCoinValue(parseFloat(e.target.value) || '');
  };

  const handleReplenish = () => {
    if (typeof inputDollarsValue === 'number' && inputDollarsValue > 0) {
      dispatch(addDollars(inputDollarsValue));
      setSuccessMessage("Кошелёк пополнен!");
      setError(null);
      setInputDollarsValue(''); // Очистить поле ввода
    } else {
      setError("Введите корректное значение долларов.");
    }
  };

  const handleSwap = () => {
    if (typeof inputCoinValue === 'number' && inputCoinValue > 0) {
      if (wallet.dollars >= inputCoinValue) {
        dispatch(buyCoins(inputCoinValue));
        setSuccessMessage("Обмен успешно выполнен!");
        setError(null);
        setInputCoinValue(''); // Очистить поле ввода
      } else {
        setError("Недостаточно денег для обмена.");
      }
    } else {
      setError("Введите корректное значение монет.");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Кошелёк</title>
      </Head>
      <div className={style.wallet}>
        {/* <h1>Кошелёк</h1> */}
        <div className={style.balanceSection}>
          <p className={style.balanceText}>Баланс</p>
          <div className={style.balanceInfo}>
            <div className={style.coinBalance}>{wallet.dollars} $</div>
            <div className={style.coinBalance}>{wallet.coins} coins</div>
          </div>
        </div>
        <input
          type="number"
          min="0"
          placeholder="Пополнить dollars"
          value={inputDollarsValue}
          onChange={handleChangeDollarInput}
          className={style.inputDollar}
        />
        <button
          type="button"
          onClick={handleReplenish}
          className={style.btnReplenish}
        >
          Пополнить
        </button>
        <input
          type="number"
          min="0"
          placeholder="Обменять dollars на coins"
          value={inputCoinValue}
          onChange={handleChangeCoinInput}
          className={style.inputCoin}
        />
        <button
          type="button"
          onClick={handleSwap}
          className={style.btnSwap}
        >
          Обменять
        </button>
        {error && <p className={style.error}>{error}</p>}
        {successMessage && <p className={style.success}>{successMessage}</p>}
      </div>
    </Layout>
  );
}

export default Wallet;
