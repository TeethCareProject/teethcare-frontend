import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, notification } from "antd";
import UpdateBookingDetailModalContentComponent from "../../components/UpdateBookingDetailModalContent/UpdateBookingDetailModalContent.component";
import DentistPickingModalContainer from "../DentistPickingModal/DentistPickingModal.container;";
import ServicePickingModalContainer from "../ServicePickingModal/ServicePickingModal.container";

import UpdateBookingFormValueToUpdateBookingData from "../../mapper/UpdateBookingFormValueToUpdateBookingData";

import { updateBooking } from "../../services/teeth-apis/BookingController";

const UpdateBookingDetailModalContentContainer = ({ bookingData }) => {
  const [form] = Form.useForm();
  const bookingId = bookingData?.id;

  const [isDentistModalOpened, setDentistModalOpened] = useState(false);
  const [isServiceModalOpened, setServiceModalOpened] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const role = useSelector((state) => state?.authentication?.user?.roleName);

  const clinicId = useSelector(
    (state) => state.authentication?.user?.clinic?.id
  );

  const dentistModalClickHandler = (e) => {
    setDentistModalOpened((isDentistModalOpened) => !isDentistModalOpened);
  };

  const serviceModalClickHandler = (e) => {
    setServiceModalOpened((isServiceModalOpened) => !isServiceModalOpened);
  };

  const updateClickHandler = (e) => {
    setIsUpdated((isUpdated) => !isUpdated);
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
      resetField();
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
      <DentistPickingModalContainer />
      <ServicePickingModalContainer />
      <UpdateBookingDetailModalContentComponent form={form} />
    </>
  );
};

export default UpdateBookingDetailModalContentContainer;
