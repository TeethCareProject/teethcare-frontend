import React, { useEffect, useState } from "react";
import BookingServiceFormComponent from "../../components/BookingServiceForm/BookingServiceForm.component";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { useHistory } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { bookService } from "../../services/teeth-apis/BookingController";
import UserToBookingFormMapper from "../../mapper/UserToBookingFormMapper";
import { convertDateToMilliseconds } from "../../utils/convert.utils";
import { getServiceById } from "../../services/teeth-apis/ServiceController";
import { notification } from "antd";
import ServiceEntityToServiceCard from "../../mapper/ServiceEntityToServiceCard";

const BookingServiceFormContainer = () => {
  const { serviceId } = useParams();
  const user = useSelector((state) => state?.authentication?.user);
  const [serviceData, setServiceData] = useState({});
  const [form] = useForm();
  const history = useHistory();

  const fetchServiceData = async () => {
    try {
      const { data } = await getServiceById(serviceId);
      const mapperResult = ServiceEntityToServiceCard(data);
      setServiceData(mapperResult);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching service data, try again later`,
        duration: 2,
      });
      //TODO: come back to clinic page?
      history.push(RoutePath.HOME_PAGE);
    }
  };

  const onFinish = (values) => {
    //submit form
    const submitBooking = async () => {
      try {
        await bookService({
          serviceId: serviceId,
          desiredCheckingTime: convertDateToMilliseconds(
            values.desiredCheckingTime -
              (values.desiredCheckingTime % (60 * 60 * 1000))
          ),
          description: values.description,
        });
        history.push(RoutePath.BOOKING_SUCCESSFUL_PAGE);
      } catch (e) {
        console.log(e);
        // history.push(RoutePath.BOOKING_FAILED_PAGE);
      }
    };
    submitBooking();
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  useEffect(() => {
    if (user) {
      const mapperResult = UserToBookingFormMapper(user);
      form.setFieldsValue(mapperResult);
    }
  }, [user]);

  return (
    <BookingServiceFormComponent
      form={form}
      name="booking-form"
      onFinish={onFinish}
      layout="vertical"
      serviceData={serviceData}
    />
  );
};

export default BookingServiceFormContainer;
