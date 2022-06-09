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
import {
  messaging,
  onMessageListener,
} from "../services/firebase/firebase-init";
import BookingServicePage from "../pages/BookingServicePage/BookingServicePage";
import BookingSuccessfulPage from "../pages/BookingServicePage/BookingResultPage/BookingSuccessfulPage";
import BookingFailedPage from "../pages/BookingServicePage/BookingResultPage/BookingFailedPage";
import { Modal, notification } from "antd";
import { onMessage } from "firebase/messaging";
import { generatePath } from "react-router-dom";
import TriggerQrCodeNotificationPage from "../pages/TriggerQrCodeNotificationPage/TriggerQrCodeNotificationPage";
import { checkMobile } from "../utils/checkUserAgent";

const AppRouter = () => {
  const dispatch = useDispatch();

  dispatch(initFcmToken());

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      const { notification: notificationData } = payload;

      if (notificationData.title === "OPEN_BOOKING_NOTIFICATION") {
        if (!checkMobile()) {
          Modal.confirm({
            title: "Open booking detail",
            content: `do you want to open the detail of booking ${notificationData.body}? (this will be opened in new tab)`,
            onOk: () =>
              window.open(
                generatePath(RoutePath.DASHBOARD_WITH_TAB_PAGE, { tab: 1 }) +
                  `?bookingId=${notificationData.body}`
              ),
            onCancel: () => {},
          });
        } else {
          notification["success"]({
            message: "Send notification successfully",
          });
        }
        return;
      }

      notification["info"]({
        message: notificationData.title,
        description: notificationData.body,
      });

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
        <PrivateRouter
          key="trigger"
          component={() => <TriggerQrCodeNotificationPage />}
          path={"/popupDetail/:bookingId"} //there is a bug that can't use RoutePath, will fix later
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
