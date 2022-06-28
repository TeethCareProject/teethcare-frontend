import { Button, Modal, notification, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingDetailModalComponent from "../../components/BookingDetailModal/BookingDetailModal.component";
import UpdateBookingDetailModalContentContainer from "../UpdateBookingDetailModalContent/UpdateBookingDetailModalContent.container";
import BookingDetailModalContentComponent from "../../components/BookingDetailModalContent/BookingDetailModalContent.component";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";

import {
  evaluateBooking,
  getBookingById,
} from "../../services/teeth-apis/BookingController";
import PatientActionButtonGroupContainer from "./PatientActionButtonGroup.container";
import CSActionButtonGroupContainer from "./CSActionButtonGroup.container";

const BookingDetailModalContainer = ({ bookingId, setNeededBooking }) => {
  const [bookingData, setBookingData] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  const role = useSelector((state) => state?.authentication?.user?.roleName);

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

  const handleCancel = () => {
    setNeededBooking(null);
    setIsUpdated(false);
  };

  const updateClickHandler = (e) => {
    setIsUpdated((isUpdated) => !isUpdated);
  };

  useEffect(() => {
    bookingId && fetchBookingData();
    setDisabled(false);
  }, [bookingId, isRendered]);

  const handleAssign = async (evaluateValues) => {
    try {
      await evaluateBooking({ bookingId, ...evaluateValues });
      await fetchBookingData();
    } catch ({ response }) {
      const { status, data } = response;
      if (status === 400) {
        setDisabled((prev) => !prev);
        notification["error"]({
          message: `Something went wrong! Try again latter!`,
          description: `You can't cancel a booking after 120s from creating`,
          duration: 2,
        });
      } else {
        notification["error"]({
          message: `Something went wrong! Try again latter!`,
          description: `There is something wrong! Try again later!`,
        });
      }
    }
  };

  return (
    <Modal
      destroyOnClose
      visible={bookingId !== null}
      onCancel={handleCancel}
      width="80vw"
      footer={null}
    >
      <BookingDetailModalComponent
        bookingData={bookingData}
        role={role}
        isUpdated={isUpdated}
        updateClickHandler={updateClickHandler}
      />
      {role === RoleConstant.CUSTOMER_SERVICE &&
      bookingData?.status === BookingStatusConstants.REQUEST &&
      isUpdated ? (
        <UpdateBookingDetailModalContentContainer
          bookingData={bookingData}
          setIsUpdated={setIsUpdated}
          setIsRendered={setIsRendered}
          isRendered={isRendered}
        />
      ) : (
        <BookingDetailModalContentComponent
          bookingData={bookingData}
          role={role}
          setIsRendered={setIsRendered}
          isRendered={isRendered}
        />
      )}
      {bookingId && role === RoleConstant.PATIENT ? (
        <PatientActionButtonGroupContainer
          bookingId={bookingId}
          bookingData={bookingData}
          disabled={disabled}
          handleAssign={handleAssign}
        />
      ) : null}
      <CSActionButtonGroupContainer
        bookingId={bookingId}
        bookingData={bookingData}
        role={role}
        handleAssign={handleAssign}
        fetchBookingData={fetchBookingData}
        setNeededBooking={setNeededBooking}
      />
    </Modal>
  );
};

export default BookingDetailModalContainer;
