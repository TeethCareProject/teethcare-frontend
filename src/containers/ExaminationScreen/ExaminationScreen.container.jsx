import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/teeth-apis/BookingController";
import { getAllServices } from "../../services/teeth-apis/ServiceController";

import ExaminationScreenComponent from "../../components/ExaminationScreen/ExaminationScreen.component";

const ExaminationScreenContainer = () => {
  const { bookingId } = useParams();

  const [bookingData, setBookingData] = useState({});
  const [services, setServices] = useState([]);

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
    bookingId && fetchBookingData();
  }, [bookingId]);

  return <ExaminationScreenComponent booking={bookingData} />;
};

export default ExaminationScreenContainer;
