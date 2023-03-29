import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authAPI, authSlice } from "./auth";
import { profileAPI } from "./profile";
import { leaderboardsAPI } from "./leaderboards";
import { threadsAPI } from "./threads";
import { userAPI } from "./user";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [leaderboardsAPI.reducerPath]: leaderboardsAPI.reducer,
  [profileAPI.reducerPath]: profileAPI.reducer,
  [threadsAPI.reducerPath]: threadsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authAPI.middleware,
      leaderboardsAPI.middleware,
      profileAPI.middleware,
      threadsAPI.middleware,
      userAPI.middleware,
    ]);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
