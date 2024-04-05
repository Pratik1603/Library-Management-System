import { configureStore, combineReducers } from '@reduxjs/toolkit';
import bookReducer from '../book/bookSlice.jsx';
import userReducer from '../user/userSlice.jsx';
import issueReducer from '../issue/issueSlice.jsx';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  book: bookReducer,
  issue:issueReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);