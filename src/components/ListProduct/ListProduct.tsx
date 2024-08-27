import Image from "next/image";
import styles from "./ListProduct.module.scss";

interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  thumbnail?: string;
}

interface CardProps {
  product: Product;
  addQuantity: Function;
  removeItem: Function;
  checkQuantity: Function;
  minusQuantity: Function;
}

function ListProduct(props: CardProps) {
  const handleAddClick = () => {
    props.addQuantity(props.product);
  };

  const handleRemoveClick = () => {
    props.removeItem(props.product.id);
  };

  const handleMinusClick = () => {
    props.minusQuantity(props.product);
  };

  return (
    <li className={styles.item}>
      {props.product.thumbnail ? (
        <Image
          src={props.product.thumbnail}
          alt="Изображение товара"
          className={styles.image}
          width="50"
          height="50"
        />
      ) : (
        <Image
          src={`${`https://imgholder.ru/200x200/adb9ca/374355&text=${props.product.title}&font=bebas`}`}
          alt="Изображение товара"
          className={styles.image}
          width="50"
          height="50"
        />
      )}

      <div className={styles.info}>
        <div>
          <span className={styles.title}>{props.product.title}</span>
        </div>
        <div className={styles.info_desc}>
          <span className={styles.id}>ID: {props.product.id}</span>
          <span className={styles.price}>
            Цена:{" "}
            {Math.floor(props.product.price - props.product.discountPercentage)}
          </span>
        </div>
      </div>
      <div className={styles.quantity}>
        <span className={styles.label}>Количество:</span>
        <button
          className={`${styles.button} ${
            props.checkQuantity(props.product) ? styles.disabled : styles.active
          }`}
          onClick={handleAddClick}
          disabled={props.checkQuantity(props.product)}
        >
          +
        </button>
        <span className={styles.quantity}>{props.product.quantity}</span>

        <button
          className={`${styles.button} ${
            props.product.quantity <= 0 ? styles.disabled : styles.active
          }`}
          onClick={handleMinusClick}
          disabled={props.product.quantity <= 0}
        >
          -
        </button>

        <button
          type="button"
          className={`${styles.button} ${styles.active}`}
          onClick={handleRemoveClick}
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

export default ListProduct;
