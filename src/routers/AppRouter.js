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
import { notification } from "antd";
import { onMessage } from "firebase/messaging";
import { useHistory } from "react-router-dom";

const AppRouter = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(initFcmToken());
  }, []);

  useEffect(async () => {
    const unsubscribe = await onMessage(messaging, (payload) => {
      const { notification: notificationData } = payload;

      // if (notificationData.type === "OPEN_BOOKING_NOTIFICATION") {
      //   if (!window.location.pathname.includes(RoutePath.DASHBOARD_PAGE)) {
      //     history.push(RoutePath.DASHBOARD_PAGE, {
      //       tab: "BOOKING",
      //       bookingId: notificationData.body,
      //     });
      //   }
      // }
      notification["info"]({
        message: notificationData.title,
        description: notificationData.body,
      });

      dispatch(getNotificationList());
    });

    return unsubscribe;
  }, []);

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
