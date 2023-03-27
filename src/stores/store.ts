import { configureStore } from "@reduxjs/toolkit";

import { threadsAPI } from "./threads";

export const store = configureStore({
  reducer: {
    [threadsAPI.reducerPath]: threadsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(threadsAPI.middleware);
  },
});
