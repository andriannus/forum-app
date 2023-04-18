import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
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
import { leaderboardsAPI } from "./leaderboards";
import { threadsAPI, threadsSlice } from "./threads";
import { userAPI } from "./user";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  threads: threadsSlice.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [leaderboardsAPI.reducerPath]: leaderboardsAPI.reducer,
  [threadsAPI.reducerPath]: threadsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
        authAPI.middleware,
        leaderboardsAPI.middleware,
        threadsAPI.middleware,
        userAPI.middleware,
      ]);
    },
    preloadedState,
  });
};

export const persistor = persistStore(setupStore());

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
