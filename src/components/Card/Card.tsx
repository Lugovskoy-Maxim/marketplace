import Link from 'next/link';
import style from './Card.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slice/cartSlice';
import { IRootState } from '@/store/store';

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

  function chekQuantoty() {
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
        <div className={style.card}>
          <Link className={style.link} href={`/product/${product.id}`}>
            <p className={style.title}>{product.title}</p>
          </Link>
          <div className={style.information}>
            <span className={`${style.quantity} `}>
              На складе: {product.quantity}
            </span>
            <span className={`${style.id} `}>Код товара: {product.id}</span>
          </div>
          <div className={style.price}>
            <div className={style.clickbait}>
              <p className={`${style.price} ${style.base}`}>
                {product.price} $
              </p>
              <p className={`${style.price} ${style.discount}`}>
                - {product.discountPercentage}%
              </p>
            </div>
            <div className={`${style.discountPercentage}`}>
              Цена:
              <p className={`${style.price} ${style.final}`}>
                {Math.floor(product.price - product.discountPercentage)} $
              </p>
              <button
                type="button"
                disabled={chekQuantoty()}
                className={`${style.button} ${
                  !chekQuantoty() ? style.active : style.disabled
                }`}
                onClick={handleAddToCart}
              >
                Купить
              </button>
            </div>
          </div>

          <div className={style.btn}></div>
        </div>
      </div>
    </li>
  );
}

export default Card;
