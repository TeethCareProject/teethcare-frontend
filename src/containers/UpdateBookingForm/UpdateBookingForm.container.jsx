import React, { useState } from "react";
import UpdatingBookingFormComponent from "../../components/DentistUpdateBookingForm/DentistUpdateBookingForm.component";
import { updateBookingDuringTreatment } from "../../services/teeth-apis/BookingController";
import RequestUpdateFormToRequestUpdateData from "../../mapper/RequestUpdateFormToRequestUpdateData.js";
import ServicePickingModalContainer from "../ServicePickingModal/ServicePickingModal.container";
import { notification } from "antd";

const UpdateBookingFormContainer = ({
  isUpdated,
  bookingId,
  setIsRendered,
  setShowInfo,
  form,
}) => {
  const [isServiceModalOpened, setServiceModalOpened] = useState(false);

  const serviceModalClickHandler = () => {
    setServiceModalOpened((isServiceModalOpened) => !isServiceModalOpened);
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
      <UpdatingBookingFormComponent
        serviceModalClickHandler={serviceModalClickHandler}
        form={form}
        isUpdated={isUpdated}
        onFinish={onFinish}
        deleteServiceHandler={deleteServiceHandler}
      />
    </>
  );
};

export default UpdateBookingFormContainer;
