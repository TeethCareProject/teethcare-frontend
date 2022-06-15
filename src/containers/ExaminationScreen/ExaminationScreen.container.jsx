import React, { useState, useEffect } from "react";
import { notification, Form } from "antd";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/teeth-apis/BookingController";

import { updateBookingDuringTreatment } from "../../services/teeth-apis/BookingController";
import RequestUpdateFormToRequestUpdateData from "../../mapper/RequestUpdateFormToRequestUpdateData.js";
import ExaminationScreenComponent from "../../components/ExaminationScreen/ExaminationScreen.component";
import ServicePickingModalContainer from "../ServicePickingModal/ServicePickingModal.container";

const ExaminationScreenContainer = () => {
  const [form] = Form.useForm();
  const { bookingId } = useParams();
  const [isRendered, setIsRendered] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);
  const [bookingData, setBookingData] = useState({});
  const [isServiceModalOpened, setServiceModalOpened] = useState(false);

  const serviceModalClickHandler = () => {
    setServiceModalOpened((isServiceModalOpened) => !isServiceModalOpened);
  };

  const switchUpdateState = () => {
    setIsUpdated((prev) => !prev);
  };

  const deleteServiceHandler = (deletedService) => {
    let selectedServices = form.getFieldValue("serviceIds");
    if (selectedServices && selectedServices.includes(deletedService)) {
      const array = selectedServices.filter(
        (service) => service.id !== deletedService.id
      );
      form.setFieldsValue({
        serviceIds: array,
      });
    }
    setIsRendered((prev) => !prev);
  };

  const onFinish = async (values) => {
    try {
      await updateBookingDuringTreatment(
        RequestUpdateFormToRequestUpdateData({ bookingId, ...values })
      );
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating booking data, try again later`,
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

  useEffect(() => {
    bookingId && fetchBookingData();
  }, [bookingId]);

  return (
    <>
      <ServicePickingModalContainer
        serviceModalClickHandler={serviceModalClickHandler}
        isServiceModalOpened={isServiceModalOpened}
        form={form}
      />
      <ExaminationScreenComponent
        form={form}
        booking={bookingData}
        onFinish={onFinish}
        deleteServiceHandler={deleteServiceHandler}
        serviceModalClickHandler={serviceModalClickHandler}
        isRendered={isRendered}
        isUpdated={isUpdated}
        switchUpdateState={switchUpdateState}
      />
    </>
  );
};

export default ExaminationScreenContainer;
