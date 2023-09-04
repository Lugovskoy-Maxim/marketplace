import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store/store';
import Layout from '@/layouts/layout';
import ListProduct from '@/components/ListProduct/ListProduct';
import { useCallback, useEffect, useState } from 'react';
import { addToCart, removeFromCart, clearCart } from '@/store/slice/cartSlice';
import { buyToCoin, buyToDollars } from '@/store/slice/walletSlice';

function Cart() {
  interface Product {
    id: number;
    title: string;
    quantity: number;
    price: number;
    discountPercentage: number;
  }

  interface Props {
    products: Product[];
  }

  const dispatch = useDispatch();
  const data: Props = useSelector((state: IRootState) => state.data);
  const cart = useSelector((state: IRootState) => state.carts);
  const wallet = useSelector((state: IRootState) => state.wallet);

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [currency, setCurrency] = useState('dollars');
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotalAmount = useCallback(() => {
    let totalAmount = 0;
    if (cart.items.length === 0) {
      return 0;
    } else {
      for (let i = 0; i < cart.items.length; i++) {
        totalAmount +=
          (cart.items[i].price - cart.items[i].discountPercentage) *
          cart.items[i].quantity;
      }
      return Math.floor(totalAmount);
    }
  }, [cart.items]);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
    if (currency === 'dollars' && wallet.dollars >= totalAmount) {
      setDisabledBtn(false);
    } else if (currency === 'coins' && wallet.coins >= totalAmount) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [
    calculateTotalAmount,
    cart.items,
    currency,
    totalAmount,
    wallet.coins,
    wallet.dollars,
  ]);

  function checkQuantity(item: { id: any; quantity: number }) {
    const index = data.products.findIndex((product) => product.id === item.id);
    if (index !== -1 && data.products[index].quantity - 1 >= item.quantity) {
      return false;
    }
    return true;
  }

  function addQuantity(item: { id: any; quantity: number }) {
    const index = data.products.findIndex((product) => product.id === item.id);
    if (index !== -1 && data.products[index].quantity >= item.quantity) {
      dispatch(addToCart(item));
      return true;
    }
    return false;
  }

  function removeItem(id: number) {
    dispatch(removeFromCart(id));
  }

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const handlePayment = () => {
    if (currency === 'dollars') {
      dispatch(buyToDollars(calculateTotalAmount()));
      dispatch(clearCart());
    } else if (currency === 'coins') {
      dispatch(buyToCoin(calculateTotalAmount()));
      dispatch(clearCart());
    }
  };

  return (
    <Layout>
      <div className="cart">
        <ul>
          {cart.items.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            cart.items.map((product) => (
              <ListProduct
                key={product.id}
                product={product}
                addQuantity={addQuantity}
                removeItem={removeItem}
                chekQuantity={checkQuantity}
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
            disabledBtn || totalAmount === 0 ? 'disabled' : 'active'
          }`}
          disabled={disabledBtn}
        >
          Оплатить (
          {`${cart.items.length === 0 ? 0 : totalAmount}
          ${currency}`}
          )
        </button>
      </div>
    </Layout>
  );
}

export default Cart;
