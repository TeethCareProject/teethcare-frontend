import React, { useState } from "react";
import DentistUpdatingBookingFormComponent from "../../components/DentistUpdateBookingForm/DentistUpdateBookingForm.component";
import { updateBookingDuringTreatment } from "../../services/teeth-apis/BookingController";
import RequestUpdateFormToRequestUpdateData from "../../mapper/RequestUpdateFormToRequestUpdateData.js";
import ServicePickingModalContainer from "../ServicePickingModal/ServicePickingModal.container";
import { notification } from "antd";

const DentistUpdateBookingFormContainer = ({
  bookingId,
  setIsRendered,
  setShowInfo,
  form,
  bookingData,
}) => {
  const [isUpdated, setIsUpdated] = useState(true);
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
      setShowInfo((prev) => !prev);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating booking data, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <>
      <ServicePickingModalContainer
        isServiceModalOpened={isServiceModalOpened}
        serviceModalClickHandler={serviceModalClickHandler}
        form={form}
      />
      <DentistUpdatingBookingFormComponent
        serviceModalClickHandler={serviceModalClickHandler}
        form={form}
        isUpdated={isUpdated}
        onFinish={onFinish}
        deleteServiceHandler={deleteServiceHandler}
        switchUpdateState={switchUpdateState}
        bookingData={bookingData}
      />
    </>
  );
};

export default DentistUpdateBookingFormContainer;
