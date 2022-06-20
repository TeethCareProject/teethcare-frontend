import React, { useState } from "react";
import CreateAppointmentFormComponent from "../../components/CreateAppointmentForm/CreateAppointmentForm.component";
import { createAppointments } from "../../services/teeth-apis/AppointmentController";
import AppointmentFormValueToAppointmentData from "../../mapper/AppointmentFormValueToAppointmentData";

import { notification, Form } from "antd";

const CreateAppointmentFormContainer = ({ bookingId, goToNextExamination }) => {
  const [form] = Form.useForm();
  const [isDisplayed, setIsDisplayed] = useState(false);

  const onFinish = async (values) => {
    try {
      await createAppointments(
        AppointmentFormValueToAppointmentData({
          preBookingId: bookingId,
          ...values,
        })
      );
      setIsDisplayed((isDisplayed) => !isDisplayed);
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
      <CreateAppointmentFormComponent
        form={form}
        onFinish={onFinish}
        goToNextExamination={goToNextExamination}
        isDisplayed={isDisplayed}
      />
    </>
  );
};

export default CreateAppointmentFormContainer;
