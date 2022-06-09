import React from "react";
import NavigationBar from "../components/commons/NavigationBar/NavigationBar.component";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import ClinicPage from "../pages/ClinicPage/ClinicPage";
import ClinicDetailPage from "../pages/ClinicDetailPage/ClinicDetailPage";
import ServiceDetailPage from "../pages/ServiceDetailPage/ServiceDetailPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import CustomerServiceDashboardPage from "../pages/CustomerServiceDashboardPage/CustomerServiceDashboardPage";
import DentistDashboardPage from "../pages/DentistDashboardPage/DentistDashboardPage";
import ManagerDashboardPage from "../pages/ManagerDashboardPage/ManagerDashboardPage";
import AdminDashboardPage from "../pages/AdminDashboardPage/AdminDashboardPage";
import PatientDashboardPage from "../pages/PatientDashboardPage/PatientDashboardPage";
import DynamicRouter from "../routers/components/DynamicRouter";
import { RoleConstant } from "../constants/RoleConstants";
import RoutePath from "./Path";
import BookingServicePage from "../pages/BookingServicePage/BookingServicePage";
import BookingSuccessfulPage from "../pages/BookingServicePage/BookingResultPage/BookingSuccessfulPage";
import BookingFailedPage from "../pages/BookingServicePage/BookingResultPage/BookingFailedPage";
import ExaminationPage from "../pages/ExaminationPage/ExaminationPage";

const AppRouter = () => {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route path={RoutePath.INTERNAL_ERROR_PAGE} exact>
          <ErrorPage code={500} />
        </Route>
        <Route path={RoutePath.HOME_PAGE} exact>
          <HomePage />
        </Route>
        <Route path={RoutePath.CLINIC_PAGE} exact>
          <ClinicPage />
        </Route>
        <Route path={RoutePath.CLINIC_DETAIL_PAGE} exact>
          <ClinicDetailPage />
        </Route>
        <Route path={RoutePath.REGISTER_PARE} exact>
          <RegisterPage />
        </Route>
        <Route path={RoutePath.LOGIN_PAGE} exact>
          <LoginPage />
        </Route>
        <Route path={RoutePath.SERVICE_DETAIL_PAGE} exact>
          <ServiceDetailPage />
        </Route>
        <Route path={RoutePath.BOOKING_PAGE}>
          <BookingServicePage />
        </Route>
        <Route path={RoutePath.BOOKING_SUCCESSFUL_PAGE}>
          <BookingSuccessfulPage />
        </Route>
        <Route path={RoutePath.BOOKING_FAILED_PAGE}>
          <BookingFailedPage />
        </Route>
        <Route path={RoutePath.EXAMINATION_PAGE}>
          <ExaminationPage />
        </Route>
        <DynamicRouter
          key="dashboard"
          componentList={{
            MANAGER: () => <ManagerDashboardPage />,
            CUSTOMER_SERVICE: () => <CustomerServiceDashboardPage />,
            DENTIST: () => <DentistDashboardPage />,
            PATIENT: () => <PatientDashboardPage />,
            ADMIN: () => <AdminDashboardPage />,
          }}
          path={RoutePath.DASHBOARD_PAGE}
          exact
          accessibleRoles={Object.keys(RoleConstant)}
        />
        {/* for production deployment*/}
        <Route path="/index.html">
          <Redirect to={RoutePath.HOME_PAGE} />
        </Route>
        <Route path="*" render={() => <ErrorPage code={404} />} />
      </Switch>
    </>
  );
};

export default AppRouter;
