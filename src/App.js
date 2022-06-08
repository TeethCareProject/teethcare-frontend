import React, { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorHandlerComponent from "./components/ErrorHandler/ErrorHandler.component";
import { createBrowserHistory } from "history";
import AppRouter from "./routers/AppRouter";
import store from "./redux";
import {
  onMessageListener,
  requestForToken,
} from "./services/firebase/firebase-init";

function App() {
  const history = createBrowserHistory();
  const [messToken, setMessToken] = useState();

  requestForToken(setMessToken);

  console.log(messToken);

  onMessageListener()
    .then((payload) => {
      console.log(payload);
      alert(payload.notification.body);
      debugger;
    })
    .catch((err) => console.log("failed: ", err));

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
