import Layout from '@/layouts/layout';
import { addDollars, buyCoins } from '@/store/slice/walletSlice';
import { IRootState } from '@/store/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Wallet() {
  const dispatch = useDispatch();
  const wallet = useSelector((state: IRootState) => state.wallet);
  const [inputDollarsValue, setInputDollarsValue] = useState(0);
  const [inputCoinValue, setInputCoinValue] = useState(0);

  const handleChangeDollarInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputDollarsValue(parseFloat(e.currentTarget.value));
  };

  function replenishmentDollarСurrency() {
    dispatch(addDollars(inputDollarsValue));
  }
  const handleChangeCoinInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputCoinValue(parseFloat(e.currentTarget.value));
  };

  function swapDollarToCoins() {
    dispatch(buyCoins(inputDollarsValue));
  }

  return (
    <Layout>
      <div>
        <h1>WALLET</h1>
        <div>
          <p>Баланс</p>
          <div>
            <div>
              <p>{wallet.dollars} $</p>
              <p>{wallet.coins} coins</p>
            </div>
          </div>
        </div>
        <input
          type="text"
          min="1"
          placeholder="пополнить dollars"
          value={inputDollarsValue}
          onChange={(e) => handleChangeDollarInput(e)}
        ></input>
        <button type="button" onClick={() => replenishmentDollarСurrency()}>
          Пополнить
        </button>
        <input
          type="text"
          min="1"
          placeholder="обменять dollars на coins"
          value={inputCoinValue}
          onChange={(e) => handleChangeCoinInput(e)}
        ></input>
        <button type="button" onClick={() => swapDollarToCoins()}>
          Обменять
        </button>
      </div>
    </Layout>
  );
}

export default Wallet;
