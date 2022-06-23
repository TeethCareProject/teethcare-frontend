import React, { useState, useEffect } from "react";
import CreateAppointmentFormComponent from "../../components/CreateAppointmentForm/CreateAppointmentForm.component";
import { createAppointments } from "../../services/teeth-apis/AppointmentController";
import AppointmentFormValueToAppointmentData from "../../mapper/AppointmentFormValueToAppointmentData";
import { getAllBooking } from "../../services/teeth-apis/BookingController";
import { notification, Form, PageHeader, Descriptions, Col } from "antd";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { convertMillisecondsToDate } from "../../utils/convert.utils";
import { useHistory, generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";

const CreateAppointmentFormContainer = ({ bookingId, bookingData }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [bookingArray, setBookingArray] = useState();

  const index = bookingArray ? 0 : -1;
  const nextBooking = bookingArray ? bookingArray[0] : null;

  const onFinish = async (values) => {
    try {
      await createAppointments(
        AppointmentFormValueToAppointmentData({
          preBookingId: bookingId,
          ...values,
        })
      );
      setIsDisplayed((isDisplayed) => !isDisplayed);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating booking data, try again later`,
        duration: 2,
      });
    }
  };

  const fetchBookingArray = async () => {
    try {
      const { data } = await getAllBooking({
        status: BookingStatusConstants.TREATMENT,
        isConfirmed: false,
      });
      setBookingArray(data?.content);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  const goToNextExamination = () => {
    if (index !== bookingArray.length) {
      history.push(
        generatePath(RoutePath.EXAMINATION_PAGE, {
          bookingId: nextBooking?.id,
        })
      );
    } else {
      history.push(RoutePath.DASHBOARD_PAGE);
    }
  };

  useEffect(() => {
    fetchBookingArray();
  }, [bookingId]);

  return (
    <Col span={12} style={{ margin: "30px 40px" }}>
      <CreateAppointmentFormComponent
        form={form}
        onFinish={onFinish}
        goToNextExamination={goToNextExamination}
        isDisplayed={isDisplayed}
      />
      {bookingData &&
      bookingData?.confirmed &&
      bookingData?.status === BookingStatusConstants.TREATMENT ? (
        <PageHeader
          ghost={false}
          title="Next examination:"
          subTitle={`BookingId: ${nextBooking?.id}`}
          style={{
            borderRadius: 20,
            boxShadow: "0px 2px 4px 2px #bbbbbb",
          }}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Next patient">
              {nextBooking?.patient?.firstName +
                " " +
                nextBooking?.patient?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Examination time: ">
              {convertMillisecondsToDate(nextBooking?.examinationTime)}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      ) : null}
    </Col>
  );
};

export default CreateAppointmentFormContainer;
