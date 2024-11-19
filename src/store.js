// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import rootReducer from './reducers/authSlice';
import userReducer from './reducers/usersSlice';
import slotReducer from './reducers/slotslice';
import patientReducer from "./reducers/patientSlice";

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

// Combine reducers
const rootReducerCombined = combineReducers({
  auth: rootReducer,
  users: userReducer,
  slots: slotReducer,
  patient: patientReducer
});

// Apply persisted reducer to the combined reducers
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
