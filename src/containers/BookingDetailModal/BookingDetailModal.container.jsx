import { Button, Modal, notification, Space, Form } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import BookingDetailModalComponent from "../../components/BookingDetailModal/BookingDetailModal.component";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import UpdateBookingFormValueToUpdateBookingData from "../../mapper/UpdateBookingFormValueToUpdateBookingData";
import { RoleConstant } from "../../constants/RoleConstants";
import QRCode from "react-qr-code";
import {
  evaluateBooking,
  getBookingById,
  updateBooking,
  checkIn,
} from "../../services/teeth-apis/BookingController";
import { getAllServices } from "../../services/teeth-apis/ServiceController";

import { getAllDentists } from "../../services/teeth-apis/DentistController";
import { generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";

const BookingDetailModalContainer = ({ bookingId, setNeededBooking }) => {
  const [form] = Form.useForm();
  const [bookingData, setBookingData] = useState();
  const [dentists, setDentists] = useState();
  const [services, setServices] = useState();
  const [selectedDentistId, setSelectedDentistId] = useState();
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [isDentistModalOpened, setDentistModalOpened] = useState(false);
  const [isServiceModalOpened, setServiceModalOpened] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const role = useSelector((state) => state?.authentication?.user?.roleName);

  const clinicId = useSelector(
    (state) => state.authentication?.user?.clinic?.id
  );

  const dentistModalClickHandler = (e) => {
    setDentistModalOpened((isDentistModalOpened) => !isDentistModalOpened);
  };

  const serviceModalClickHandler = (e) => {
    setServiceModalOpened((isServiceModalOpened) => !isServiceModalOpened);
  };

  const updateClickHandler = (e) => {
    setIsUpdated((isUpdated) => !isUpdated);
  };

  const chooseServiceHandler = (serviceId) => {
    if (selectedServiceIds && !selectedServiceIds.includes(serviceId)) {
      setSelectedServiceIds((prev) => {
        return [...prev, serviceId];
      });
    }
  };

  const deleteServiceHandler = (serviceId) => {
    if (selectedServiceIds && selectedServiceIds.includes(serviceId)) {
      setSelectedServiceIds((prevState) => {
        const array = prevState.filter((id) => id !== serviceId);
        return array;
      });
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

  const onDentistChange = (value) => {
    form.setFieldsValue({
      dentistId: value,
    });
  };

  const onServiceChange = (value) => {
    form.setFieldsValue({
      serviceIds: value,
    });
  };

  const resetField = () => {
    form.setFieldsValue({
      dentistId: null,
      examinationTime: null,
      serviceIds: null,
    });
  };

  const updateBookingData = async (values) => {
    try {
      await updateBooking(
        UpdateBookingFormValueToUpdateBookingData({ bookingId, ...values })
      );
      resetField();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating booking data, try again later`,
        duration: 2,
      });
    }
  };

  const fetchBookingData = async () => {
    try {
      const { data } = await getBookingById(bookingId);
      setBookingData(data);
      setSelectedDentistId(data?.dentist?.id);
      form.setFieldsValue({
        dentistId: data?.dentist?.id,
        // examinationTime: convertMillisecondsToDate(data?.examinationTime),
      });
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  const fetchDentist = async () => {
    try {
      const { data } = await getAllDentists({
        clinicId,
        isPageable: false,
      });
      setDentists(data.content);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };
  const fetchServices = async () => {
    try {
      const { data } = await getAllServices({
        clinicId,
      });
      setServices(data.content);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    onServiceChange(selectedServiceIds);
  }, [selectedServiceIds]);

  const handleOk = () => {
    setNeededBooking(null);
  };

  const handleCancel = () => {
    setNeededBooking(null);
    setSelectedDentistId(null);
    setSelectedServiceIds([]);
    setIsUpdated(false);
  };

  useEffect(() => {
    bookingId && fetchBookingData();
  }, [bookingId]);

  useEffect(() => {
    role === RoleConstant.CUSTOMER_SERVICE && fetchDentist();
  }, []);

  useEffect(() => {
    role === RoleConstant.CUSTOMER_SERVICE && fetchServices();
  }, []);

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
      <BookingDetailModalComponent
        form={form}
        onDentistChange={onDentistChange}
        resetField={resetField}
        bookingData={bookingData}
        updateBookingData={updateBookingData}
        role={role}
        dentists={dentists}
        services={services}
        selectedDentistId={selectedDentistId}
        isDentistModalOpened={isDentistModalOpened}
        setDentistModalOpened={setDentistModalOpened}
        dentistModalClickHandler={dentistModalClickHandler}
        setSelectedDentistId={setSelectedDentistId}
        selectedServiceIds={selectedServiceIds}
        setSelectedServiceIds={setSelectedServiceIds}
        serviceModalClickHandler={serviceModalClickHandler}
        isServiceModalOpened={isServiceModalOpened}
        setServiceModalOpened={setServiceModalOpened}
        chooseServiceHandler={chooseServiceHandler}
        deleteServiceHandler={deleteServiceHandler}
        isUpdated={isUpdated}
        updateClickHandler={updateClickHandler}
        checkInHandler={checkInHandler}
      />
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
        </>
      ) : null}
      {bookingData?.status === BookingStatusConstants.PENDING &&
      role === RoleConstant.CUSTOMER_SERVICE ? (
        <Space>
          <Button onClick={() => handleAssign(true)}>
            Process this booking
          </Button>
          <Button onClick={() => handleAssign(false)}>Reject</Button>
        </Space>
      ) : null}
    </Modal>
  );
};

export default BookingDetailModalContainer;
