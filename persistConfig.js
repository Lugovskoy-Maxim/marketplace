import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root', // ключ для сохранения данных в localStorage
  storage, // место хранения данных (localStorage)
};

export default persistConfig;
