import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/store';
import style from './Header.module.scss';
import Link from 'next/link';

function Header() {
  const wallet = useSelector((state: IRootState) => state.wallet);
  const carts = useSelector((state: IRootState) => state.carts);
  const totalAmount = carts.items.reduce(
    (total, item) =>
      total + Math.floor(item.price - item.discountPercentage) * item.quantity,
    0
  );

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <ul className={style.list}>
          <li>
            <Link className={style.item} href="/">
              Products
            </Link>
          </li>
          <li>
            <Link className={style.item} href="/wallet/">
              Wallet
            </Link>
          </li>
          <li>
            <Link className={style.item} href="/cart/">
              Cart
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        Баланс: {wallet.dollars}$, {wallet.coins} coins
      </div>
      <div>
        Корзина:
        {carts.items.length === 0 ? (
          ' нет товаров в корзине'
        ) : (
          <div>
            <p>Общая сумма: {totalAmount} $</p>
            {/* <ul>
              {carts.items.map((item, index) => (
                <li key={index}>
                  {`Товар ID: ${item.id}, Название: ${item.title}, Количество: ${item.quantity}, цена: ${item.discountedPrice} $`}
                </li>
              ))}
            </ul> */}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
