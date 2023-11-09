import style from './ListProduct.module.scss';

interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
}

interface CardProps {
  product: Product;
  addQuantity: Function;
  removeItem: Function;
  chekQuantity: Function;
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
    <li className={style.item}>
      <div className={style.info}>
        <span className={style.title}>{props.product.title}</span>
        <span className={style.id}>ID: {props.product.id}</span>
        <span className={style.price}>
          Цена:
          {Math.floor(props.product.price - props.product.discountPercentage)}
        </span>
      </div>
      <div className={style.quantity}>
        <span className={style.label}>Количество:</span>
        <button
          className={`${style.button} ${
            props.chekQuantity(props.product) ? style.disabled : style.active
          }`}
          onClick={handleAddClick}
          disabled={props.chekQuantity(props.product)}
        >
          +
        </button>
        <span className={style.quantity}>{props.product.quantity}</span>

        <button
          className={`${style.button} ${
            props.product.quantity <= 0 ? style.disabled : style.active
          }`}
          onClick={handleMinusClick}
          disabled={props.product.quantity <= 0}
        >
          -
        </button>

        <button
          type="button"
          className={`${style.button} ${style.active}`}
          onClick={handleRemoveClick}
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

export default ListProduct;
