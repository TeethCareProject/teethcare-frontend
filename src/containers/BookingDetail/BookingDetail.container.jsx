import { notification } from "antd";
import React, { useEffect, useState } from "react";
import BookingDetailComponent from "../../components/BookingDetail/BookingDetail.component";
import { getBookingById } from "../../services/teeth-apis/BookingController";

const BookingDetailContainer = ({ bookingId }) => {
  const [bookingData, setBookingData] = useState({});

  const fetchBookingData = async () => {
    try {
      const { data } = await getBookingById(bookingId);
      setBookingData(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [bookingId]);

  return <BookingDetailComponent bookingData={bookingData} />;
};

export default BookingDetailContainer;
