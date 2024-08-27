import Link from "next/link";
import styles from "./Card.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, minusQuantity, removeFromCart } from "@/store/slice/cartSlice";
import { IRootState } from "@/store/store";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

interface CardProps {
  product: Product;
}

function Card({ product }: CardProps) {
  const dispatch = useDispatch();
  const productInCart = useSelector((state: IRootState) => state.carts.items);


  function checkQuantityNumber() {
    const existingItemIndex = productInCart.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex == -1) {
      return 0;
    } else if (productInCart[existingItemIndex].quantity > 0) {
      return productInCart[existingItemIndex].quantity;
    }
    return 0;
  }

  function checkQuantity() {
    const existingItemIndex = productInCart.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex == -1) {
      return false;
    } else if (productInCart[existingItemIndex].quantity >= product.quantity) {
      return true;
    }
    return false;
  }

  const handleAddItemCart = () => {
    // функция добавления в корзину
    dispatch(addToCart(product));
  };

  const handleRemovingItemCart = () => {
    // функция добавления в корзину
    dispatch(minusQuantity(product));
  };

  function minusQuantityItem() {
    if (checkQuantityNumber() <= 1) {
      dispatch(removeFromCart(product.id));
    }
    dispatch(minusQuantity(product));
  }


  return (
    <li key={product.id}>
      <div>
        <div className={styles.card}>
          <Image
            src={product.thumbnail}
            alt={`${product.title}`}
            priority={false}
            width="200"
            height="200"
          />
          <Link className={styles.link} href={`/product/${product.id}`}>
            <p className={styles.title}>{product.title}</p>
          </Link>
          <div className={styles.information}>
            <span className={`${styles.quantity} `}>
              количество: {product.quantity}
            </span>
            <span className={`${styles.id} `}>код товара: {product.id}</span>
          </div>
          <div className={styles.price}>
            <div className={styles.clickbait}>
              <p className={`${styles.price} ${styles.base}`}>
                {product.price} $
              </p>
              <p className={`${styles.price} ${styles.discount}`}>
                -{product.discountPercentage}%
              </p>
            </div>
            <div className={`${styles.discountPercentage}`}>
              {/* Цена: */}
              <p className={`${styles.price} ${styles.final}`}>
                {Math.floor(product.price - (product.price/100 * product.discountPercentage))} $
              </p>

              {/* Если 0 то купить если 1 и больше то добавляется возможность добавить или удалить */}
              <div>
                {checkQuantityNumber() == 0 ? (
                  <button
                    type="button"
                    disabled={checkQuantity()}
                    className={`${styles.button} ${
                      !checkQuantity() ? styles.active : styles.disabled
                    }`}
                    onClick={handleAddItemCart}
                  >
                    {checkQuantityNumber() == 0 ? "Купить" : `Купить ещё`}
                  </button>
                ) : (
                  <div className={styles.count_buttons}>
                    <button
                    type="button"
                    disabled={checkQuantityNumber() == 0}
                    className={` ${
                      checkQuantityNumber() == 0 ? styles.disabled : styles.active
                    }`}
                    onClick={minusQuantityItem}
                  >
                    {'-'}
                  </button>
                    <p>{checkQuantityNumber()}</p>
                    <button
                    type="button"
                    disabled={checkQuantity()}
                    className={` ${
                      !checkQuantity() ? styles.active : styles.disabled
                    }`}
                    onClick={handleAddItemCart}
                  >
                    {'+'}
                  </button>
                  </div>
                )}
              </div>
            </div>
            {/* <div className={styles.cartQuantity}>
              {checkQuantityNumber() == 0
                ? " "
                : `в корзине: ${checkQuantityNumber()}`}{" "}
            </div> */}
          </div>

          <div className={styles.btn}></div>
        </div>
      </div>
    </li>
  );
}

export default Card;
