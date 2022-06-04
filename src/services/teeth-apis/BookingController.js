import { BOOKING_END_POINT } from "../end-points/BookingEndPoints";
import { CallAPI } from "./axiosBase";

export const bookService = (bookingData) =>
  CallAPI(`${BOOKING_END_POINT}`, "POST", {
    description: bookingData.description,
    desiredCheckingTime: bookingData.desiredCheckingTime,
    serviceId: bookingData.serviceId,
  });

export const getAllBooking = (options) =>
  CallAPI(`${BOOKING_END_POINT}`, "GET", {}, { ...options });

export const getBookingById = (bookingId) =>
  CallAPI(`${BOOKING_END_POINT}/${bookingId}`, "GET");

export const evaluateBooking = (bookingId, isAccepted) =>
  CallAPI(`${BOOKING_END_POINT}/accept`, "PUT", {}, { bookingId, isAccepted });