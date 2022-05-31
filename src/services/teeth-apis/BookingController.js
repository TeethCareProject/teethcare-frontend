import { CallAPI } from "./axiosBase";

export const bookService = (bookingData) =>
  CallAPI("/bookings", "POST", {
    description: bookingData.description,
    desiredCheckingTime: bookingData.desiredCheckingTime,
    serviceId: bookingData.serviceId,
  });

export const getAllBooking = (options) =>
  CallAPI("/bookings", "GET", {}, { ...options });
