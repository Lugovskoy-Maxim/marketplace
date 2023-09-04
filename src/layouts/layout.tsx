import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchProductsFailed,
  fetchProductsSuccess,
} from '@/store/slice/productsSlice';
import { IRootState } from '../store/store';
import { fetchProductsData } from '@/api/api';
import Header from '@/components/Header/Header';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const stateData = useSelector((state: IRootState) => state.data);
  // const products = useSelector((state: IRootState) => state.data.products);

  useEffect(() => {
    if (stateData.products.length === 0) {
      dispatch(fetchProducts());
      // после успешного выполнения создаем действие для Redux
      fetchProductsData()
        .then((data) => {
          dispatch(fetchProductsSuccess(data));
        })
        .catch((error) => {
          dispatch(fetchProductsFailed(error));
          console.log(error);
        });
    }
  }, [stateData.products.length, dispatch]);

  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
}

export default Layout;
