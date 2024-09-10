import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { useRouter } from "next/router";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Image from "next/image";
import {
  addToCart,
  removeFromCart,
  minusQuantity,
} from "@/store/slice/cartSlice";
import style from "./id.module.scss";

function ProductCard() {
  interface Product {
    id: number;
    title: string;
    quantity: number;
    price: number;
    discountPercentage: number;
    thumbnail: string;
  }

  interface CartItem {
    id: number;
    quantity: number;
  }

  interface Props {
    products: Product[];
  }

  const router = useRouter();
  const id = router.query.id as string;
  const data: Props = useSelector((state: IRootState) => state.data);
  const cart = useSelector((state: IRootState) => state.carts.items); // Получаем товары в корзине
  const dispatch = useDispatch();

  // Проверяем наличие карточки по id
  const product = data.products.find(
    (product) => product.id === parseInt(id, 10)
  );

  // Ищем количество данного товара в корзине
  const cartItem = cart.find((item: CartItem) => item.id === product?.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Обработчики для добавления, уменьшения количества и удаления товара
  const handleAddClick = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleRemoveClick = () => {
    if (product) {
      dispatch(removeFromCart(product.id));
    }
  };

  const handleMinusClick = () => {
    if (product) {
      dispatch(minusQuantity(product));
    }
  };

  if (product) {
    // Рассчитываем цену со скидкой
    const discountedPrice = (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);

    return (
      <Layout>
        <Head>
          <title>Купить {product.title}</title>
        </Head>
        <h1>{product.title}</h1>
        <div style={{ display: "flex" }}>
          <div className={style.productPage}>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
            />
          </div>
          <div>
            <div className={style.productDetails}>
              <p>Цена: {discountedPrice} $</p>
              <p>Скидка: {product.discountPercentage}%</p>
              <p>Оригинальная цена: {product.price} $</p>
              <p>Количество: {product.quantity}</p>
            </div>
            <div className={style.productActions}>
              {quantityInCart > 0 ? (
                <div className={style.cartControls}>
                  <button
                    onClick={handleMinusClick}
                    disabled={quantityInCart == 1}
                  >
                    -
                  </button>
                  <span>{quantityInCart}</span>
                  <button
                    onClick={handleAddClick}
                    disabled={quantityInCart == product.quantity}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button onClick={handleAddClick}>Добавить в корзину</button>
              )}
              {quantityInCart > 0 && (
                <button onClick={handleRemoveClick}>Удалить из корзины</button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Карточка не найдена</title>
      </Head>
      <div>Карточка не найдена</div>
    </Layout>
  );
}

export default ProductCard;
