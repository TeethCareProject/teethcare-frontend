import React, { useState, useEffect } from "react";
import { notification, Form, Row, Alert, Divider } from "antd";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/teeth-apis/BookingController";
import ServicePickingModalContainer from "../ServicePickingModal/ServicePickingModal.container";
import ExaminationScreenRightSideContainer from "../ExaminationScreenRightSide/ExaminationScreenRightSide.container";
import ExaminationScreenLeftSideComponent from "../../components/ExaminationScreenLeftSide/ExaminationScreenLeftSide.component";

const ExaminationScreenContainer = () => {
  const [form] = Form.useForm();
  const [isServiceModalOpened, setServiceModalOpened] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { bookingId } = useParams();
  const [isRendered, setIsRendered] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);
  const [bookingData, setBookingData] = useState({});

  const switchUpdateState = () => {
    setIsUpdated((prev) => !prev);
  };

  const serviceModalClickHandler = () => {
    setServiceModalOpened((isServiceModalOpened) => !isServiceModalOpened);
  };

  const fetchBookingData = async () => {
    try {
      const { data } = await getBookingById(bookingId);
      setBookingData(data);
      form.setFieldsValue({
        serviceIds: data.services,
      });
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    bookingId && fetchBookingData();
  }, [bookingId]);

  return (
    <>
      <ServicePickingModalContainer
        isServiceModalOpened={isServiceModalOpened}
        serviceModalClickHandler={serviceModalClickHandler}
        form={form}
      />
      <Row style={{ marginLeft: 20 }}>
        {showInfo ? (
          <Alert
            message="Waiting for confirm updated..."
            type="info"
            showIcon
          />
        ) : null}
      </Row>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <ExaminationScreenLeftSideComponent
          booking={bookingData}
          switchUpdateState={switchUpdateState}
        />
        <Divider type="vertical" style={{ height: "90vh" }} />
        <ExaminationScreenRightSideContainer
          form={form}
          isRendered={isRendered}
          isUpdated={isUpdated}
          bookingId={bookingId}
          setIsRendered={setIsRendered}
          setShowInfo={setShowInfo}
          serviceModalClickHandler={serviceModalClickHandler}
        />
      </Row>
    </>
  );
};

export default ExaminationScreenContainer;
