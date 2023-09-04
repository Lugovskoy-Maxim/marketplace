import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/store';
import Layout from '@/layouts/layout';
import ListProduct from '@/components/ListProduct/ListProduct';
import { useEffect, useState } from 'react';
import { addToCart, removeFromCart } from '@/store/slice/cartSlice';
import { bayToCoin, bayToDollars } from '@/store/slice/walletSlice';

function Cart() {
  const dispatch = useDispatch();
  const data = useSelector((state: IRootState) => state.data);
  const cart = useSelector((state: IRootState) => state.carts);
  const wallet = useSelector((state: IRootState) => state.wallet);
  const [disabledBtn, setDisabledBth] = useState(true);
  const [currency, setCurrency] = useState('dollars');
  const [totalAmount, setTotalAmout] = useState(0);

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    if (cart.items.length == 0) {
      return 0;
    } else {
      for (let i = 0; i < cart.items.length; i++) {
        totalAmount += parseFloat(
          (cart.items[i].price - cart.items[i].discountPercentage) *
            cart.items[i].quantity
        );
      }
      return Math.floor(totalAmount);
    }
  };

  useEffect(() => {
    setTotalAmout(calculateTotalAmount);
    if (currency === 'dollars' && wallet.dollars >= totalAmount) {
      setDisabledBth(false);
    } else if (currency === 'coins' && wallet.coins >= totalAmount) {
      setDisabledBth(false);
    } else {
      setDisabledBth(true);
    }
  }, [
    calculateTotalAmount,
    cart.items,
    currency,
    totalAmount,
    wallet.coins,
    wallet.dollars,
  ]);

  console.log(disabledBtn);
  function chekQuantity(item: { id: any; quantity: number }) {
    const index = data.products.findIndex((product) => product.id === item.id);
    if (index !== -1 && data.products[index].quantity >= item.quantity) {
      return false;
    }
    return true;
  }

  function addQuantity(item: { id: any; quantity: number }) {
    // поиск индекса в массиве продуктов
    const index = data.products.findIndex((product) => product.id === item.id);

    // отключение возможности накидать в корзину больше товаров чем есть
    if (index !== -1 && data.products[index].quantity >= item.quantity) {
      dispatch(addToCart(item));
      return true;
    }
    return false;
  }
  // удаление из карзины
  function removeItem(id: number) {
    dispatch(removeFromCart(id));
  }

  // текущая валюта (для оплаты)
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const handlePayment = () => {
    if (currency === 'dollars') {
      dispatch(bayToDollars(calculateTotalAmount()));
    } else if (currency === 'coins') {
      dispatch(bayToCoin(calculateTotalAmount()));
    }
  };

  return (
    <Layout>
      <div className="cart">
        <ul>
          {cart.items.length == 0 ? (
            <p>Корзина пуста</p>
          ) : (
            cart.items.map((product) => (
              <ListProduct
                key={product.id}
                product={product}
                addQuantity={addQuantity}
                removeItem={removeItem}
                chekQuantity={chekQuantity}
              />
            ))
          )}
        </ul>

        <div className="currency-selector">
          <span>Выберите валюту:</span>
          <button
            onClick={() => handleCurrencyChange('dollars')}
            className={currency === 'dollars' ? 'active' : ''}
          >
            $
          </button>
          <button
            onClick={() => handleCurrencyChange('coins')}
            className={currency === 'coins' ? 'active' : ''}
          >
            coins
          </button>
        </div>

        <button
          onClick={handlePayment}
          className={`payment-button ${
            disabledBtn || totalAmount == 0 ? 'disabled' : 'active'
          }`}
          disabled={disabledBtn}
        >
          Оплатить (
          {`${cart.items.length == 0 ? 0 : totalAmount}
          ${currency}`}
          )
        </button>
      </div>
    </Layout>
  );
}

export default Cart;
