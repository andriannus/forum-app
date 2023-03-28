import { FC, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { AppRoutes } from "@/app";
import { persistor, store } from "@/stores";

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Suspense>
            <AppRoutes />
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
