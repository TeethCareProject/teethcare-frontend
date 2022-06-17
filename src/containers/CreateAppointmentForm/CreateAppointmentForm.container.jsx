import React from "react";
import CreateAppointmentFormComponent from "../../components/CreateAppointmentForm/CreateAppointmentForm.component";
import { updateBookingDuringTreatment } from "../../services/teeth-apis/BookingController";
import RequestUpdateFormToRequestUpdateData from "../../mapper/RequestUpdateFormToRequestUpdateData.js";
import { notification } from "antd";

const CreateAppointmentFormContainer = ({}) => {
  return (
    <>
      <CreateAppointmentFormComponent />
    </>
  );
};

export default CreateAppointmentFormContainer;
