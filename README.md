## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Пробная версия маркетплейса.

- Карточки товаров из FakeAPI https://dummyjson.com/carts.

- Товары можно добавлять в корзину, а так же можно производить покупку, вся покупка сделана на фронте, добавил в корзину => выбрал способ оплаты => оплата => списание средств и вывод успешной покупки.

- В корзине 2 валюты $ и Coin обмен 1 к 1.

- Все товары можно покупать за любую валюту, но если Coin не хватает для покупки можно пополнить через $, но а так же можно купить и за $.

stack: Next 13.5, Axios, React Query, redux-toolkit, TS.

Демо страница [ТУТ_ТЫК](https://lugovskoy-maxim.github.io/test_marketplace/)
