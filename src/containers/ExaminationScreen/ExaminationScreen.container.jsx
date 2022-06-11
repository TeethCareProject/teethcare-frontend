import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/teeth-apis/BookingController";
import { useSelector } from "react-redux";
import { getAllServices } from "../../services/teeth-apis/ServiceController";

import { requestUpdate } from "../../services/teeth-apis/BookingController";
import UpdateBookingFormValueToUpdateBookingData from "../../mapper/UpdateBookingFormValueToUpdateBookingData";
import ExaminationScreenComponent from "../../components/ExaminationScreen/ExaminationScreen.component";

const ExaminationScreenContainer = () => {
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.clinicId
  );

  const { bookingId } = useParams();

  const [bookingData, setBookingData] = useState({});
  const [services, setServices] = useState([]);

  const onFinish = async (values) => {
    try {
      await requestUpdate(
        UpdateBookingFormValueToUpdateBookingData({ bookingId, ...values })
      );
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

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

  const fetchServices = async () => {
    try {
      const { data } = await getAllServices(clinicId);
      setServices(data.content);
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

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ExaminationScreenComponent
      booking={bookingData}
      services={services}
      onFinish={onFinish}
    />
  );
};

export default ExaminationScreenContainer;
