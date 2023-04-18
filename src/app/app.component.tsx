import { Suspense } from "react";
import type { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { AppRoutes } from "@/app";
import { persistor, setupStore } from "@/stores";

const App: FC = () => {
  return (
    <Provider store={setupStore()}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <Router>
            <Suspense>
              <AppRoutes />
            </Suspense>
          </Router>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
