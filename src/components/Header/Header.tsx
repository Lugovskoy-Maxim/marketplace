import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import style from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const wallet = useSelector((state: IRootState) => state.wallet);
  const carts = useSelector((state: IRootState) => state.carts);
  const totalAmount = carts.items.reduce(
    (total, item) =>
      total +
      Math.floor(item.price - (item.price / 100) * item.discountPercentage) *
        item.quantity,
    0
  );

  const router = useRouter();

  const handleWalletClick = () => {
    router.push("/wallet");
  };
  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <header className={style.header}>
      <div></div>
      <nav className={style.nav}>
        <ul className={style.list}>
          <li>
            <Link className={style.item} href="/">
              Товары
            </Link>
          </li>
          <li>
            <Link className={style.item} href="/wallet/">
              Кошелёк
            </Link>
          </li>
          <li>
            <Link className={style.item} href="/cart/">
              Корзина
            </Link>
          </li>
        </ul>
      </nav>
      <div className={style.right}>
        <button className={style.wallet} onClick={handleWalletClick}>
          <p className={style.title}>Баланс:</p>
          <p className={style.titleDollar}>{wallet.dollars} $</p>
          <p className={style.titleCoin}>{wallet.coins} c </p>
        </button>
        <div className={style.cart}>
          <button className={style.cartItem} onClick={handleCartClick}>
            <p className={style.title}>Корзина:</p>
            {carts.items.length === 0 ? (
              <p className={style.count}>корзина пуста</p>
            ) : (
              <div>
                <p className={style.count}>{totalAmount} $</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
