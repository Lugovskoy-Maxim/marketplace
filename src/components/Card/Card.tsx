import Link from 'next/link';
import styles from './Card.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slice/cartSlice';
import { IRootState } from '@/store/store';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
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

  const handleAddToCart = () => {
    // функция добавления в корзину
    dispatch(addToCart(product));
  };

  return (
    <li key={product.id}>
      <div>
        <div className={styles.card}>
          <Image
            src={`https://imgholder.ru/200x200/adb9ca/374355&text=${product.title}&font=bebas`}
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
              На складе: {product.quantity}
            </span>
            <span className={`${styles.id} `}>Код товара: {product.id}</span>
          </div>
          <div className={styles.price}>
            <div className={styles.clickbait}>
              <p className={`${styles.price} ${styles.base}`}>
                {product.price} $
              </p>
              <p className={`${styles.price} ${styles.discount}`}>
                - {product.discountPercentage}%
              </p>
            </div>
            <div className={`${styles.discountPercentage}`}>
              Цена:
              <p className={`${styles.price} ${styles.final}`}>
                {Math.floor(product.price - product.discountPercentage)} $
              </p>
              <button
                type="button"
                disabled={checkQuantity()}
                className={`${styles.button} ${
                  !checkQuantity() ? styles.active : styles.disabled
                }`}
                onClick={handleAddToCart}
              >
                {checkQuantityNumber() == 0 ? 'Купить' : `Купить ещё`}
              </button>
            </div>
            <div className={styles.cartQuantity}>
              {checkQuantityNumber() == 0
                ? ' '
                : `в корзине: ${checkQuantityNumber()}`}{' '}
            </div>
          </div>

          <div className={styles.btn}></div>
        </div>
      </div>
    </li>
  );
}

export default Card;
