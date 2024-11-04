// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index';
import CryptoJS from 'crypto-js';

const secretKey = '4!bB7eP#j0j&8nQ@r';

const encryptor = {
  in: (state) => {
    const stateString = JSON.stringify(state);
    const encrypted = CryptoJS.AES.encrypt(stateString, secretKey).toString();
    return encrypted;
  },
  out: (state) => {
    const bytes = CryptoJS.AES.decrypt(state, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  },
};

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
