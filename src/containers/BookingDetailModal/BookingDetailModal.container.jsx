import { Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import BookingDetailModalComponent from "../../components/BookingDetailModal/BookingDetailModal.component";
import { getBookingById } from "../../services/teeth-apis/BookingController";

const BookingDetailModalContainer = ({ bookingId, setNeededBooking }) => {
  const [bookingData, setBookingData] = useState({});

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

  const handleOk = () => {
    setNeededBooking(null);
  };

  const handleCancel = () => {
    setNeededBooking(null);
  };

  useEffect(() => {
    bookingId && fetchBookingData();
  }, [bookingId]);

  return (
    <Modal
      destroyOnClose
      visible={bookingId !== null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <BookingDetailModalComponent bookingData={bookingData} />
    </Modal>
  );
};

export default BookingDetailModalContainer;
