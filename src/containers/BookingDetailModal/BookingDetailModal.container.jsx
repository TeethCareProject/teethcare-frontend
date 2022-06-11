import { Button, Modal, notification, Space } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import BookingDetailModalComponent from "../../components/BookingDetailModal/BookingDetailModal.component";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import UpdateBookingFormValueToUpdateBookingData from "../../mapper/UpdateBookingFormValueToUpdateBookingData";
import { RoleConstant } from "../../constants/RoleConstants";
import QRCode from "react-qr-code";
import {
  evaluateBooking,
  getBookingById,
} from "../../services/teeth-apis/BookingController";
import { updateBooking } from "../../services/teeth-apis/BookingController";
import { getAllDentists } from "../../services/teeth-apis/DentistController";
import { generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";

const BookingDetailModalContainer = ({ bookingId, setNeededBooking }) => {
  const [bookingData, setBookingData] = useState();
  const [dentists, setDentists] = useState();
  const [selectedDentistId, setSelectedDentistId] = useState();
  const [isOpened, setIsOpened] = useState(false);

  const role = useSelector((state) => state?.authentication?.user?.roleName);

  const modalClickHandler = (e) => {
    setIsOpened(!isOpened);
    console.log(isOpened);
  };

  const updateBookingData = async (values) => {
    try {
      await updateBooking(
        UpdateBookingFormValueToUpdateBookingData({ bookingId, ...values })
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
      setSelectedDentistId(data?.dentist?.id);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  const fetchDentist = async () => {
    try {
      const { data } = await getAllDentists({
        clinicId: bookingData?.clinic?.id,
        isPageable: false,
      });
      setDentists(data.content);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  const handleOk = () => {
    setNeededBooking(null);
  };

  const handleCancel = () => {
    setNeededBooking(null);
  };

  useEffect(() => {
    bookingId && fetchBookingData();
  }, [bookingId]);

  useEffect(() => {
    bookingData && fetchDentist();
  }, [bookingData]);

  const handleAssign = async (isAccepted) => {
    try {
      await evaluateBooking(bookingId, isAccepted);
      await fetchBookingData();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching assigning, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <Modal
      destroyOnClose
      visible={bookingId !== null}
      onOk={handleOk}
      onCancel={handleCancel}
      width="80vw"
      footer={false}
    >
      <BookingDetailModalComponent
        bookingData={bookingData}
        updateBookingData={updateBookingData}
        dentists={dentists}
        selectedDentistId={selectedDentistId}
        setSelectedDentistId={setSelectedDentistId}
        modalClickHandler={modalClickHandler}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
      {bookingId && role === RoleConstant.PATIENT ? (
        <>
          <div style={{ background: "white", padding: "16px" }}>
            <QRCode
              value={`${window.location.origin}${generatePath(
                RoutePath.TRIGGER_QR_CODE_NOTIFICATION_PAGE,
                { bookingId: bookingId }
              )}`}
            />
          </div>
        </>
      ) : null}
      {bookingData?.status === BookingStatusConstants.PENDING &&
      role === RoleConstant.CUSTOMER_SERVICE ? (
        <Space>
          <Button onClick={() => handleAssign(true)}>
            Process this booking
          </Button>
          <Button onClick={() => handleAssign(false)}>Reject</Button>
        </Space>
      ) : null}
    </Modal>
  );
};

export default BookingDetailModalContainer;
