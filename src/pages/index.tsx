import { useSelector } from 'react-redux';
import { IRootState } from '../store/store';
import Layout from '@/layouts/layout';
import ProductCards from '@/components/ProductCards/ProductCards';

export default function Home() {
  const data = useSelector((state: IRootState) => state.data);

  return (
    <Layout>
      {data.loading ? (
        <p>Загрузка...</p>
      ) : (
        <ProductCards productsData={data.products} />
      )}
    </Layout>
  );
}
