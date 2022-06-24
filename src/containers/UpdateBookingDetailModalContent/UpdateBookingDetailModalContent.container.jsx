import React, { useEffect, useState } from "react";
import { Form, notification } from "antd";
import UpdateBookingDetailModalContentComponent from "../../components/UpdateBookingDetailModalContent/UpdateBookingDetailModalContent.component";
import DentistPickingModalContainer from "../DentistPickingModal/DentistPickingModal.container";
import ServicePickingModalContainer from "../ServicePickingModal/ServicePickingModal.container";

import UpdateBookingFormValueToUpdateBookingData from "../../mapper/UpdateBookingFormValueToUpdateBookingData";

import { updateBooking } from "../../services/teeth-apis/BookingController";

const UpdateBookingDetailModalContentContainer = ({
  bookingData,
  setIsUpdated,
  setIsRendered,
  isRendered,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...bookingData,
      examinationTime: null,
    });
  }, [bookingData]);

  const bookingId = bookingData?.id;

  const [isDentistModalOpened, setDentistModalOpened] = useState(false);
  const [isServiceModalOpened, setServiceModalOpened] = useState(false);

  const dentistModalClickHandler = (e) => {
    setDentistModalOpened((isDentistModalOpened) => !isDentistModalOpened);
  };

  const serviceModalClickHandler = (e) => {
    setServiceModalOpened((isServiceModalOpened) => !isServiceModalOpened);
  };

  const resetField = () => {
    form.setFieldsValue({
      dentistId: null,
      examinationTime: null,
      serviceIds: null,
    });
  };

  const updateBookingData = async (values) => {
    try {
      await updateBooking(
        UpdateBookingFormValueToUpdateBookingData({ bookingId, ...values })
      );
      setIsUpdated((prev) => !prev);
      setIsRendered((prev) => !prev);
      resetField();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating booking data, try again later`,
        duration: 2,
      });
    }
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
    setIsRendered((prev) => setIsRendered(!prev));
  };

  return (
    <>
      <DentistPickingModalContainer
        dentistModalClickHandler={dentistModalClickHandler}
        isDentistModalOpened={isDentistModalOpened}
        form={form}
      />
      <ServicePickingModalContainer
        serviceModalClickHandler={serviceModalClickHandler}
        isServiceModalOpened={isServiceModalOpened}
        form={form}
      />
      <UpdateBookingDetailModalContentComponent
        form={form}
        updateBookingData={updateBookingData}
        dentistModalClickHandler={dentistModalClickHandler}
        serviceModalClickHandler={serviceModalClickHandler}
        deleteServiceHandler={deleteServiceHandler}
        isRendered={isRendered}
      />
    </>
  );
};

export default UpdateBookingDetailModalContentContainer;
