import { Modal, notification, Form, Input, DatePicker, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getAppointmentById } from "../../services/teeth-apis/AppointmentController";
import AppointmentDetailModalComponent from "../../components/AppointmentDetailModal/AppointmentDetailModal.component";
import moment from "moment";
import { BookingFromAppointmentValidation } from "../../validate/BookingFromAppointmentValidation";
import AppointmentToBookingForm from "../../mapper/AppointmentToBookingForm";
import { createBookingFromAppointment } from "../../services/teeth-apis/BookingController";

const AppointmentDetailModalContainer = ({
  appointmentId,
  setNeededAppointment,
}) => {
  const [appointmentData, setAppointmentData] = useState();

  const fetchAppointmentData = async () => {
    try {
      const { data } = await getAppointmentById(appointmentId);
      setAppointmentData(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  const handleCancel = () => {
    setNeededAppointment(null);
  };

  useEffect(() => {
    appointmentId && fetchAppointmentData();
  }, [appointmentId]);

  const createBooking = () => {
    Modal.info({
      title: "Register for the next examination",
      maskClosable: true,
      closable: true,
      okButtonProps: { style: { display: "none" } },
      content: (
        <CreateBookingFromModalForm
          appointmentData={appointmentData}
          appointmentId={appointmentId}
          setNeededAppointment={setNeededAppointment}
        />
      ),
    });
  };

  return (
    <Modal
      destroyOnClose
      visible={appointmentId !== null}
      onCancel={handleCancel}
      width="80vw"
      footer={null}
    >
      <AppointmentDetailModalComponent
        appointmentData={appointmentData}
        createBooking={createBooking}
        setNeededAppointment={setNeededAppointment}
      />
    </Modal>
  );
};

const CreateBookingFromModalForm = ({
  appointmentData,
  appointmentId,
  setNeededAppointment,
}) => {
  const dateFormat = "DD-MM-YYYY HH";

  const onFinish = async (values) => {
    try {
      await createBookingFromAppointment(
        AppointmentToBookingForm({
          appointmentId: appointmentId,
          ...values,
        })
      );
      setNeededAppointment(null);
      Modal.destroyAll();
      notification["success"]({
        message: `Register for next examination successfully!`,
        duration: 2,
      });
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while creating appointment, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <Form
      name="create_booking_from_modal_form"
      onFinish={onFinish}
      style={{ marginTop: 40, marginRight: 40 }}
    >
      <Form.Item
        name="description"
        label="Description"
        rules={BookingFromAppointmentValidation.description}
      >
        <Input placeholder="Enter description" />
      </Form.Item>
      <Form.Item name="desiredCheckingTime" label="Desired checking day:">
        <DatePicker
          showTime={{ format: "HH" }}
          format={`${dateFormat}:00`}
          disabledDate={(current) => {
            let customDate = moment(appointmentData?.appointmentDate);
            return current && current < moment(customDate, "DD-MM-YYYY HH");
          }}
          rules={BookingFromAppointmentValidation.desiredCheckingTime}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" shape="round" htmlType="submit">
          Create appointment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AppointmentDetailModalContainer;
