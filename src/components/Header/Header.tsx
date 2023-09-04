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
      <div className={style.right}>
        <div className={style.wallet}>
          <p className={style.title}>Баланс:</p>
          <p className={style.title}>{wallet.dollars} $</p>
          <p className={style.title}>{wallet.coins} coins</p>
        </div>
        <div className={style.cart}>
          Корзина:
          {carts.items.length === 0 ? (
            <p className={style.count}>пусто</p>
          ) : (
            <div>
              <p className={style.count}>{totalAmount} $</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
