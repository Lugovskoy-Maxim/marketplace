import React from 'react';
import Card from '../Card/Card';
import style from './ProductCards.module.scss';

interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
}

interface ProductCardsProps {
  productsData: Product[];
}

function ProductCards({ productsData }: ProductCardsProps) {
  return (
    <ul className={style.container}>
      {productsData.map((product) => (
        <Card product={product} key={product.id} />
      ))}
    </ul>
  );
}

export default ProductCards;
