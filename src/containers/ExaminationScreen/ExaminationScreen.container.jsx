import React, { useState, useEffect } from "react";
import { notification, Form, Row, Alert, Divider, Button, Col } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { getBookingById } from "../../services/teeth-apis/BookingController";
import DentistUpdatingBookingFormContainer from "../DentistUpdateBookingForm/DentistUpdateBookingForm.container";
import DentistBookingDetailComponent from "../../components/DentistBookingDetail/DentistBookingDetail.component";
import CreateAppointmentFormContainer from "../CreateAppointmentForm/CreateAppointmentForm.container";
import RoutePath from "../../routers/Path";

const ExaminationScreenContainer = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { bookingId } = useParams();
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();
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

  const returnToDashboard = () => {
    history.push(RoutePath.DASHBOARD_PAGE);
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
        <Col span={10}>
          <DentistBookingDetailComponent booking={bookingData} />
          <Button
            onClick={() => returnToDashboard()}
            style={{ margin: "0 0 30px 30px" }}
          >
            Return to dashboard
          </Button>
        </Col>
        <Divider type="vertical" style={{ height: "90vh" }} />
        {bookingData?.confirmed ? (
          <CreateAppointmentFormContainer
            bookingId={bookingId}
            bookingData={bookingData}
          />
        ) : (
          <DentistUpdatingBookingFormContainer
            setIsRendered={setIsRendered}
            setShowInfo={setShowInfo}
            form={form}
            bookingData={bookingData}
            bookingId={bookingId}
          />
        )}
      </Row>
    </>
  );
};

export default ExaminationScreenContainer;
