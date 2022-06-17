import React, { useState, useEffect } from "react";
import { notification, Form, Row, Alert, Divider } from "antd";
import { useParams } from "react-router-dom";
import { getBookingById } from "../../services/teeth-apis/BookingController";
import DentistUpdatingBookingFormContainer from "../DentistUpdateBookingForm/DentistUpdateBookingForm.container";
import DentistBookingDetailComponent from "../../components/DentistBookingDetail/DentistBookingDetail.component";

const ExaminationScreenContainer = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { bookingId } = useParams();
  const [isRendered, setIsRendered] = useState(false);

  const [bookingData, setBookingData] = useState({});

  const [form] = Form.useForm();

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
        <DentistBookingDetailComponent booking={bookingData} />
        <Divider type="vertical" style={{ height: "90vh" }} />
        <DentistUpdatingBookingFormContainer
          isRendered={isRendered}
          setIsRendered={setIsRendered}
          setShowInfo={setShowInfo}
          form={form}
          bookingData={bookingData}
        />
      </Row>
    </>
  );
};

export default ExaminationScreenContainer;
