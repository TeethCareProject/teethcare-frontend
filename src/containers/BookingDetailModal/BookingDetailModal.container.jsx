import { Button, Modal, notification, Space } from "antd";
import React, { useEffect, useState } from "react";
import BookingDetailModalComponent from "../../components/BookingDetailModal/BookingDetailModal.component";
import {
  evaluateBooking,
  getBookingById,
} from "../../services/teeth-apis/BookingController";

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
      <BookingDetailModalComponent bookingData={bookingData} />
      <Space>
        <Button onClick={() => handleAssign(true)}>Process this booking</Button>
        <Button onClick={() => handleAssign(false)}>Reject</Button>
      </Space>
    </Modal>
  );
};

export default BookingDetailModalContainer;
