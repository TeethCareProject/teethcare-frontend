import React, { useState } from "react";
import ExaminationScreenRightSideComponent from "../../components/ExaminationScreenRightSide/ExaminationScreenRightSide.component";
import { updateBookingDuringTreatment } from "../../services/teeth-apis/BookingController";
import RequestUpdateFormToRequestUpdateData from "../../mapper/RequestUpdateFormToRequestUpdateData.js";
import { notification } from "antd";

const ExaminationScreenRightSideContainer = ({
  form,
  isUpdated,
  bookingId,
  setIsRendered,
  setShowInfo,
  serviceModalClickHandler,
}) => {
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
      <ExaminationScreenRightSideComponent
        serviceModalClickHandler={serviceModalClickHandler}
        form={form}
        isUpdated={isUpdated}
        onFinish={onFinish}
        deleteServiceHandler={deleteServiceHandler}
      />
    </>
  );
};

export default ExaminationScreenRightSideContainer;
