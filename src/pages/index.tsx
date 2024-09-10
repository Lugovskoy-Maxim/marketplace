import { useSelector } from 'react-redux';
import { IRootState } from '../store/store';
import Layout from '@/layouts/layout';
import ProductCards from '@/components/ProductCards/ProductCards';
import Head from 'next/head';

export default function Home() {
  const data = useSelector((state: IRootState) => state.data);

  return (
    
    <Layout>
      <Head>
          <title>Онлайн маркетплейс ру</title>
        </Head>
      {data.loading ? (
        <div className="loading">Loading&#8230;</div>
      ) : (
        <ProductCards productsData={data.products} />
      )}
    </Layout>
  );
}
