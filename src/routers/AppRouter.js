import React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar.component";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRouter from "./components/PrivateRouter";
import CustomerServiceDashboardPage from "../pages/CustomerServiceDashboardPage/CustomerServiceDashboardPage";
import DentistDashboardPage from "../pages/DentistDashboardPage/DentistDashboardPage";
import ManagerDashboardPage from "../pages/ManagerDashboardPage/ManagerDashboardPage";
import AdminDashboardPage from "../pages/AdminDashboardPage/AdminDashboardPage";
import PatientDashboardPage from "../pages/PatientDashboardPage/PatientDashboardPage";

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
          accessibleRoles={"CUSTOMER_SERVICE"}
        ></PrivateRouter>
        <PrivateRouter
          key="dentist-dashboard"
          component={() => <DentistDashboardPage />}
          path="/dentist-dashboard"
          exact
          accessibleRoles={"DENTIST"}
        ></PrivateRouter>
        <PrivateRouter
          key="manager-dashboard"
          component={() => <ManagerDashboardPage />}
          path="/manager-dashboard"
          exact
          accessibleRoles={"MANAGER"}
        ></PrivateRouter>
        <PrivateRouter
          key="admin-dashboard"
          component={() => <AdminDashboardPage />}
          path="/admin-dashboard"
          exact
          accessibleRoles={"ADMIN"}
        ></PrivateRouter>
        <PrivateRouter
          key="patient-dashboard"
          component={() => <PatientDashboardPage />}
          path="/patient-dashboard"
          exact
          accessibleRoles={"PATIENT"}
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
