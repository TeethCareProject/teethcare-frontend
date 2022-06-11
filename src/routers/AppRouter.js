import React, { useEffect } from "react";
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
import PrivateRouter from "./components/PrivateRouter";
import { RoleConstant } from "../constants/RoleConstants";
import RoutePath from "./Path";
import { useDispatch } from "react-redux";
import {
  getNotificationList,
  initFcmToken,
} from "../redux/notification/notification.action";
import { messaging } from "../services/firebase/firebase-init";
import BookingServicePage from "../pages/BookingServicePage/BookingServicePage";
import BookingSuccessfulPage from "../pages/BookingServicePage/BookingResultPage/BookingSuccessfulPage";
import BookingFailedPage from "../pages/BookingServicePage/BookingResultPage/BookingFailedPage";
import { notification } from "antd";
import { onMessage } from "firebase/messaging";
import TriggerQrCodeNotificationPage from "../pages/TriggerQrCodeNotificationPage/TriggerQrCodeNotificationPage";
import RedirectBookingDetail from "../pages/CustomerServiceDashboardPage/RedirectBookingDetailPage";
import notificationTypes from "../notificationHandler/notification.types";
import openBookingDetailNotificationHandler from "../notificationHandler/OpenBookingDetailNotification.handler";
import ExaminationPage from "../pages/ExaminationPage/ExaminationPage";

const AppRouter = () => {
  const dispatch = useDispatch();

  dispatch(initFcmToken());

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const { notification: notificationData } = payload;

      switch (notificationData.title) {
        case notificationTypes.OPEN_BOOKING_NOTIFICATION:
          openBookingDetailNotificationHandler(notificationData);
          break;
        default:
          notification["info"]({
            message: notificationData.title,
            description: notificationData.body,
          });
          break;
      }

      dispatch(getNotificationList());
    });

    return unsubscribe;
  });

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
        <Route path={RoutePath.BOOKING_PAGE} exact>
          <BookingServicePage />
        </Route>
        <Route path={RoutePath.BOOKING_SUCCESSFUL_PAGE} exact>
          <BookingSuccessfulPage />
        </Route>
        <Route path={RoutePath.BOOKING_FAILED_PAGE} exact>
          <BookingFailedPage />
        </Route>
        <Route path={RoutePath.EXAMINATION_PAGE} exact>
          <ExaminationPage />
        </Route>
        <Route path={RoutePath.TRIGGER_QR_CODE_NOTIFICATION_PAGE} exact>
          <TriggerQrCodeNotificationPage />
        </Route>
        <PrivateRouter
          key="redirectBookingDetail"
          component={() => <RedirectBookingDetail />}
          path={RoutePath.REDIRECT_BOOKING_DETAIL_PAGE} //there is a bug that can't use RoutePath, will fix later
          exact
          accessibleRoles={[RoleConstant.CUSTOMER_SERVICE]}
        />
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
        <DynamicRouter
          key="dashboard"
          componentList={{
            MANAGER: () => <ManagerDashboardPage />,
            CUSTOMER_SERVICE: () => <CustomerServiceDashboardPage />,
            DENTIST: () => <DentistDashboardPage />,
            PATIENT: () => <PatientDashboardPage />,
            ADMIN: () => <AdminDashboardPage />,
          }}
          path={RoutePath.DASHBOARD_WITH_TAB_PAGE}
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
