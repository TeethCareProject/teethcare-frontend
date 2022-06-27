import {
  Button,
  Form,
  Modal,
  notification,
  Rate,
  Space,
  Typography,
  Input,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookingDetailModalComponent from "../../components/BookingDetailModal/BookingDetailModal.component";
import UpdateBookingDetailModalContentContainer from "../UpdateBookingDetailModalContent/UpdateBookingDetailModalContent.container";
import BookingDetailModalContentComponent from "../../components/BookingDetailModalContent/BookingDetailModalContent.component";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";
import QRCode from "react-qr-code";
import {
  evaluateBooking,
  getBookingById,
  checkIn,
  checkOut,
} from "../../services/teeth-apis/BookingController";
import { generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { giveFeedBack } from "../../services/teeth-apis/FeedbackController";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { convertMomentToMilliseconds } from "../../utils/convert.utils";

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

  const handleOk = () => {
    setNeededBooking(null);
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

  const checkInHandler = async () => {
    try {
      await checkIn(bookingId);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while check in, try again later`,
        duration: 2,
      });
    }
  };

  const checkOutHandler = async () => {
    try {
      await checkOut(bookingId);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while check out, try again later`,
      });
    }
  };

  const rejectBooking = () => {
    Modal.info({
      title: "Reject this booking",
      maskClosable: true,
      closable: true,
      okButtonProps: { style: { display: "none" } },
      content: (
        <RejectBookingForm
          handleAssign={handleAssign}
          fetchBookingData={fetchBookingData}
        />
      ),
    });
  };

  const handleGiveFeedback = (bookingId) => {
    try {
      Modal.info({
        closable: true,
        okButtonProps: { style: { display: "none" } },
        title: "Give your feedback",
        content: (
          <FeedbackForm
            bookingId={bookingId}
            fetchBookingData={fetchBookingData}
          />
        ),
      });
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while giving feedback, try again later`,
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
        role={role}
        checkInHandler={checkInHandler}
        isUpdated={isUpdated}
        updateClickHandler={updateClickHandler}
        setIsUpdated={setIsUpdated}
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
          checkInHandler={checkInHandler}
          role={role}
          setIsRendered={setIsRendered}
          isRendered={isRendered}
        />
      )}
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Space>
              <Typography>Give your feedback for this clinic!!</Typography>
              <Button
                type="primary"
                onClick={() => {
                  handleGiveFeedback(bookingId);
                }}
              >
                Give feedback
              </Button>
            </Space>
            {bookingData &&
            convertMomentToMilliseconds(moment()) -
              bookingData?.createBookingTime <
              120 * 1000 &&
            (bookingData.status === BookingStatusConstants.PENDING ||
              bookingData.status === BookingStatusConstants.REQUEST) ? (
              <Tooltip title="You can not cancel booking after 120s since created ">
                <Button
                  style={{ marginLeft: 100 }}
                  type="danger"
                  disabled={disabled}
                  onClick={() =>
                    handleAssign({
                      isAccepted: false,
                    })
                  }
                >
                  Cancel this booking
                </Button>
              </Tooltip>
            ) : null}
          </div>
        </>
      ) : null}
      <Space>
        {bookingData?.status === BookingStatusConstants.PENDING &&
        role === RoleConstant.CUSTOMER_SERVICE ? (
          <Button onClick={() => handleAssign({ isAccepted: true })}>
            Process this booking
          </Button>
        ) : null}
        {bookingData?.status === BookingStatusConstants.REQUEST ||
        (bookingData?.status === BookingStatusConstants.PENDING &&
          role === RoleConstant.CUSTOMER_SERVICE) ? (
          <Button onClick={() => rejectBooking()} style={{ marginLeft: 20 }}>
            Reject
          </Button>
        ) : null}
      </Space>
      {bookingData?.confirmed &&
      bookingData?.status === BookingStatusConstants.TREATMENT ? (
        <Button onClick={() => checkOutHandler()}>Checkout</Button>
      ) : null}
    </Modal>
  );
};

const FeedbackForm = ({ bookingId, fetchBookingData }) => {
  const onFinish = async (values) => {
    try {
      await giveFeedBack(bookingId, values.detail, values.ratingScore);
      Modal.destroyAll();
      await fetchBookingData();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while giving feedback, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="ratingScore" label="Rate">
        <Rate />
      </Form.Item>
      <Form.Item name="detail" label="Description">
        <TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send!
        </Button>
      </Form.Item>
    </Form>
  );
};

const RejectBookingForm = ({ handleAssign, fetchBookingData }) => {
  const onFinish = async (values) => {
    try {
      await handleAssign({
        isAccepted: false,
        rejectedNote: values.rejectedNote,
      });
      Modal.destroyAll();
      await fetchBookingData();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while giving feedback, try again later`,
        duration: 2,
      });
    }
  };
  return (
    <Form
      name="reject_booking_form"
      onFinish={onFinish}
      style={{ marginTop: 40, marginRight: 40 }}
    >
      <Form.Item
        name="rejectedNote"
        label="Reason"
        // rules={}
      >
        <Input placeholder="Enter reason" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit">
          Rejected
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookingDetailModalContainer;
