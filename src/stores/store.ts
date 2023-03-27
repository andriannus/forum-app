import { configureStore } from "@reduxjs/toolkit";

import { threadsAPI } from "./threads";
import { userAPI } from "./user";

export const store = configureStore({
  reducer: {
    [threadsAPI.reducerPath]: threadsAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      threadsAPI.middleware,
      userAPI.middleware,
    ]);
  },
});
