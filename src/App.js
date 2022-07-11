import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorHandlerComponent from "./components/commons/ErrorHandler/ErrorHandler.component";
import { createBrowserHistory } from "history";
import AppRouter from "./routers/AppRouter";
import store from "./redux";
import { notification } from "antd";
import { messaging } from "./services/firebase/firebase-init";
import { onMessage } from "firebase/messaging";
import "./App.css";

function App() {
  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
      <ErrorHandlerComponent>
        <Provider store={store}>
          <Suspense fallback="loading">
            <AppRouter />
          </Suspense>
        </Provider>
      </ErrorHandlerComponent>
    </BrowserRouter>
  );
}

export default App;
