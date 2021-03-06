import { BOOKING_END_POINT } from "../end-points/BookingEndPoints";
import { CallAPI } from "./axiosBase";

export const bookService = (bookingData) =>
  CallAPI(`${BOOKING_END_POINT}`, "POST", {
    description: bookingData.description,
    desiredCheckingTime: bookingData.desiredCheckingTime,
    serviceId: bookingData.serviceId,
    voucherCode: bookingData.voucherCode,
  });

export const getAllBooking = (options) =>
  CallAPI(`${BOOKING_END_POINT}`, "GET", {}, { ...options });

export const getBookingById = (bookingId) =>
  CallAPI(`${BOOKING_END_POINT}/${bookingId}`, "GET");

export const evaluateBooking = ({ bookingId, ...restValues }) =>
  CallAPI(`${BOOKING_END_POINT}/${bookingId}/accept`, "PUT", restValues);

export const updateBookingDuringTreatment = (options) =>
  CallAPI(`${BOOKING_END_POINT}/second-update`, "PUT", options);

export const confirmBooking = (options) =>
  CallAPI(`${BOOKING_END_POINT}/confirm`, "PUT", options);

export const checkOut = (bookingId) => {
  CallAPI(`${BOOKING_END_POINT}/checkout/${bookingId}`, "PUT");
};

export const updateBooking = (options) =>
  CallAPI(`${BOOKING_END_POINT}/first-update`, "PUT", options);

export const checkIn = (bookingId) =>
  CallAPI(`${BOOKING_END_POINT}/checkin/${bookingId}`, "PUT");

export const checkAvailableTime = (clinicId, bookingTime) =>
  CallAPI(
    `${BOOKING_END_POINT}/check-available-time`,
    "GET",
    {},
    { clinicId: clinicId, desiredCheckingTime: bookingTime }
  );

export const createBookingFromAppointment = (values) =>
  CallAPI(`${BOOKING_END_POINT}/create-from-appointment`, "POST", values);

export const getAvailableTime = (clinicId, date) =>
  CallAPI(
    `${BOOKING_END_POINT}/get-available-time`,
    "GET",
    {},
    { clinicId, date }
  );
