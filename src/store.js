import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { createTransform } from 'redux-persist';
import CryptoJS from 'crypto-js';

import rootReducer from './reducers/authSlice';
import userReducer from './reducers/usersSlice';
import slotReducer from './reducers/slotslice';
import patientReducer from "./reducers/patientSlice";

const secretKey = '4!bB7eP#j0j&8nQ@r';

// Create custom transform
const encryptor = createTransform(
  (inboundState) => {
    const stateString = JSON.stringify(inboundState);
    const encrypted = CryptoJS.AES.encrypt(stateString, secretKey).toString();
    return encrypted;
  },
  (outboundState) => {
    try {
      const bytes = CryptoJS.AES.decrypt(outboundState, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Decryption failed:", error);
      return {};
    }
  }
);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
};

const rootReducerCombined = combineReducers({
  auth: rootReducer,
  users: userReducer,
  slots: slotReducer,
  patient: patientReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducerCombined);

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
