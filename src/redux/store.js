// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartslice';

// ✅ Persist configuration
const persistConfig = {
  key: 'veloraCart', // Unique key
  storage,
  whitelist: ['items', 'userId', 'guestCart', 'userCarts'], // Jo bhi persist karna hai
};

// ✅ Wrap cartReducer with persistReducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// ✅ Create persistor
export const persistor = persistStore(store);