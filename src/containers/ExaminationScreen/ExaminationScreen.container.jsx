import React, { useState, useEffect } from "react";
import {
  notification,
  Form,
  Row,
  Alert,
  Divider,
  PageHeader,
  Descriptions,
} from "antd";
import { useParams, useHistory, generatePath } from "react-router-dom";
import {
  getBookingById,
  getAllBooking,
} from "../../services/teeth-apis/BookingController";
import DentistUpdatingBookingFormContainer from "../DentistUpdateBookingForm/DentistUpdateBookingForm.container";
import DentistBookingDetailComponent from "../../components/DentistBookingDetail/DentistBookingDetail.component";
import CreateAppointmentFormContainer from "../CreateAppointmentForm/CreateAppointmentForm.container";
import RoutePath from "../../routers/Path";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const ExaminationScreenContainer = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [bookingArray, setBookingArray] = useState();
  const { bookingId } = useParams();
  const [isRendered, setIsRendered] = useState(false);
  const history = useHistory();

  const [bookingData, setBookingData] = useState({});

  const [form] = Form.useForm();
  const index = bookingArray ? bookingArray.indexOf(bookingId) : -1;

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
          bookingId: bookingArray[index + 1]?.id,
        })
      );
    } else {
      history.push(RoutePath.DASHBOARD_PAGE);
    }
  };

  const returnToDashboard = () => {
    history.push(RoutePath.DASHBOARD_PAGE);
  };

  useEffect(() => {
    bookingId && fetchBookingData();
  }, [bookingId]);

  useEffect(() => {
    fetchBookingArray();
  }, [bookingId]);

  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        {bookingArray &&
        bookingData?.confirmed &&
        index !== bookingArray.length ? (
          <PageHeader
            ghost={false}
            title="Next examination:"
            subTitle={`BookingId: ${bookingArray[index + 1]?.id}`}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Next patient">
                {bookingArray[index + 1]?.patient?.firstName +
                  " " +
                  bookingArray[index + 1]?.patient?.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Examination time: ">
                {convertMillisecondsToDate(
                  bookingArray[index + 1]?.examinationTime
                )}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        ) : null}
      </div>
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
        <DentistBookingDetailComponent
          booking={bookingData}
          returnToDashboard={returnToDashboard}
        />
        <Divider type="vertical" style={{ height: "90vh" }} />
        {bookingData?.confirmed ? (
          <CreateAppointmentFormContainer
            bookingId={bookingId}
            goToNextExamination={goToNextExamination}
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
