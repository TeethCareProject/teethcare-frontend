import React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar.component";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRouter from "./components/PrivateRouter";
import CustomerServiceDashboardPage from "../pages/CustomerServiceDashboardPage/CustomerServiceDashboardPage";

const AppRouter = () => {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path={"/internal-error"} exact>
          <ErrorPage code={500} />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <PrivateRouter
          key="cs-dashboard"
          component={() => <CustomerServiceDashboardPage />}
          path="/cs-dashboard"
          exact
          accessibleRoles={"CS"}
        ></PrivateRouter>

        {/* for production deployment*/}
        <Route path="/index.html">
          <Redirect to="/" />
        </Route>
        <Route path="*" render={() => <ErrorPage code={404} />} />
      </Switch>
    </>
  );
};

export default AppRouter;
