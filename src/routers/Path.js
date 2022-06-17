const RoutePath = {
  HOME_PAGE: "/",
  TRIGGER_QR_CODE_NOTIFICATION_PAGE: "/popupDetail/:bookingId",
  REGISTER_PARE: "/register",
  CLINIC_PAGE: "/clinic",
  CLINIC_DETAIL_PAGE: "/clinic/:clinicId",
  DASHBOARD_PAGE: "/dashboard",
  DASHBOARD_WITH_TAB_PAGE: "/dashboard/:tab",
  INTERNAL_ERROR_PAGE: "/internal-error",
  LOGIN_PAGE: "/login",
  SERVICE_DETAIL_PAGE: "/clinic/:clinicId/:serviceId",
  BOOKING_PAGE: "/booking/:serviceId",
  BOOKING_SUCCESSFUL_PAGE: "/booking-result/successful",
  BOOKING_FAILED_PAGE: "/booking-result/failed",
  EXAMINATION_PAGE: "/examination/:bookingId",
  REJECT_CONFIRM_PAGE: "/confirmBooking-result/reject",
  ACCEPT_CONFIRM_PAGE: "/confirmBooking-result/accept",
  REDIRECT_BOOKING_DETAIL_PAGE: "/redirectToBookingDetail/:bookingId",
  PROFILE_PAGE: "/profile",
  CONFIRM_BOOKING_PAGE: "/confirmBooking/:bookingId",
};

export default RoutePath;
