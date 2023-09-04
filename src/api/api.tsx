import axios, { AxiosResponse } from 'axios';

interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

interface Cart {
  id: number;
  products: CartProduct[];
  userId: number;
}

export const fetchProductsData = async (): Promise<CartProduct[]> => {
  try {
    const response: AxiosResponse<{ carts: Cart[] }> = await axios.get(
      'https://dummyjson.com/carts'
    );
    const productsData: CartProduct[] = response.data.carts.reduce(
      (newArray: CartProduct[], cart: Cart) => {
        if (Array.isArray(cart.products)) {
          cart.products.forEach((product) => {
            const existingProduct = newArray.find(
              (existing) =>
                existing.id === product.id && existing.price === product.price
            );

            if (existingProduct) {
              existingProduct.quantity += product.quantity;
              existingProduct.total += product.total;
            } else {
              newArray.push(product);
            }
          });
        }
        return newArray;
      },
      []
    );
    return productsData;
  } catch (error) {
    throw error;
  }
};
