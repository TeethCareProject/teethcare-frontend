import React, { useEffect, useState } from "react";
import BookingServiceFormComponent from "../../components/BookingServiceForm/BookingServiceForm.component";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "antd/lib/form/Form";
import { useHistory } from "react-router-dom";
import RoutePath from "../../routers/Path";
import {
  bookService,
  getAvailableTime,
} from "../../services/teeth-apis/BookingController";
import UserToBookingFormMapper from "../../mapper/UserToBookingFormMapper";
import { convertMomentToMilliseconds } from "../../utils/convert.utils";
import { getServiceById } from "../../services/teeth-apis/ServiceController";
import { notification } from "antd";
import ServiceEntityToServiceCard from "../../mapper/ServiceEntityToServiceCard";
import { checkAvailableVoucherCode } from "../../services/teeth-apis/VoucherController";

const BookingServiceFormContainer = () => {
  const { serviceId } = useParams();
  const user = useSelector((state) => state?.authentication?.user);
  const [serviceData, setServiceData] = useState({});
  const [availableHourList, setAvailableHourList] = useState([]);
  const [voucherCodeMess, setVoucherCodeMess] = useState();
  const [form] = useForm();
  const history = useHistory();

  const onFinish = (values) => {
    //submit form

    if (voucherCodeMess && voucherCodeMess !== "success") return;
    if (!voucherCodeMess && form.getFieldValue("voucherCode")?.length > 0) {
      setVoucherCodeMess(
        "Please validate your voucher code before submitting!"
      );
      return;
    }

    const submitBooking = async () => {
      try {
        const { data } = await bookService({
          serviceId: serviceId,
          desiredCheckingTime:
            convertMomentToMilliseconds(values.desiredCheckingDate) +
            values.desiredHour * 60 * 60 * 1000,
          description: values.description,
          voucherCode: values.voucherCode ? values.voucherCode : null,
        });
        history.push(RoutePath.BOOKING_SUCCESSFUL_PAGE);
      } catch (e) {
        history.push(RoutePath.BOOKING_FAILED_PAGE);
      }
    };

    submitBooking();
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

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

  const handleGetAvailableHourList = async () => {
    try {
      const { data } = await getAvailableTime(
        serviceData?.clinicId,
        form
          ?.getFieldValue("desiredCheckingDate")
          ?.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
          ?.valueOf()
      );

      setAvailableHourList(data?.availableTimeList);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching available hours, try again later`,
        duration: 2,
      });
    }
  };

  const checkVoucherCode = async () => {
    try {
      await checkAvailableVoucherCode(
        form.getFieldValue("voucherCode"),
        serviceData?.clinicId
      );
      setVoucherCodeMess("success");
    } catch (e) {
      setVoucherCodeMess("Invalid voucher code! Please try other voucher!");
    }
  };

  useEffect(() => {
    if (user) {
      const mapperResult = UserToBookingFormMapper(user);
      form.setFieldsValue({ ...mapperResult });
    }
  }, [user, serviceData]);

  return (
    <BookingServiceFormComponent
      form={form}
      name="booking-form"
      onFinish={onFinish}
      layout="vertical"
      serviceData={serviceData}
      availableHourList={availableHourList}
      handleGetAvailableHourList={handleGetAvailableHourList}
      checkVoucherCode={checkVoucherCode}
      voucherCodeMess={voucherCodeMess}
      setVoucherCodeMess={setVoucherCodeMess}
    />
  );
};

export default BookingServiceFormContainer;
