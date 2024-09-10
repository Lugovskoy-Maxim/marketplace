import React, { useState } from "react";
import Card from "../Card/Card";
import style from "./ProductCards.module.scss";

interface Product {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

interface ProductCardsProps {
  productsData: Product[];
}

function ProductCards({ productsData }: ProductCardsProps) {
  // const [displayedProductsCount, setDisplayedProductsCount] = useState<
  //   [number, number]
  // >([0, 10]);
  const [currentPage, setCurrentPage] = useState(1);

  // Определение диапазона товаров
  const [productsPerPage, setProductsPerPage] = useState<number>(10);
  const totalPages = Math.ceil(productsData.length / productsPerPage);

  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;

  // Функции перехода на предыдущую и следующую страницы
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Обработчик для изменения количества отображаемого товара
  const handleProductsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProductsPerPage(Number(event.target.value));
    setCurrentPage(1); // Сброс на первую страницу после изменении количества
  };

  return (
    <>
      <div className={style.productsPerPageSelector}>
        <label htmlFor="productsPerPage">Товаров на странице:</label>
        <select
          id="productsPerPage"
          value={productsPerPage}
          onChange={handleProductsPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <ul className={style.container}>
        {productsData.slice(startIdx, endIdx).map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </ul>
      <div className={style.footer}>
        <div className={style.pagination}>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={style.paginationButton}
          >
            {"<"}
          </button>
          <span>{`Страница ${currentPage} из ${totalPages}`}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={style.paginationButton}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCards;
