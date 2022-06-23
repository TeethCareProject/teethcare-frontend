import { Modal, notification, Form, Input, DatePicker, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getAppointmentById } from "../../services/teeth-apis/AppointmentController";
import AppointmentDetailModalComponent from "../../components/AppointmentDetailModal/AppointmentDetailModal.component";
import moment from "moment";
import { convertMomentToDate } from "../../utils/convert.utils";
import AppointmentToBookingForm from "../../mapper/AppointmentToBookingForm";
import { createBookingFromAppointment } from "../../services/teeth-apis/BookingController";

const AppointmentDetailModalContainer = ({
  appointmentId,
  setNeededAppointment,
}) => {
  const dateFormat = "DD-MM-YYYY HH";
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

  const onFinish = async (values) => {
    try {
      await createBookingFromAppointment(
        AppointmentToBookingForm({
          appointmentId: appointmentId,
          ...values,
        })
      );
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while creating booking data, try again later`,
        duration: 2,
      });
    }
  };

  const handleOk = () => {
    setNeededAppointment(null);
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
        <Form
          name="create_booking_from_modal_form"
          onFinish={onFinish}
          style={{ marginTop: 40, marginRight: 40 }}
        >
          <Form.Item name="description" label="Description">
            <Input placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            name="desiredCheckingTime"
            label="Desired checking day:"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || convertMomentToDate(value) > Date.now()) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Booking date should be from tomorrow")
                  );
                },
              }),
              { required: true },
            ]}
          >
            <DatePicker
              showTime={{ format: "HH" }}
              format={`${dateFormat}:00`}
              disabledDate={(current) => {
                let customDate = moment(appointmentData?.appointmentDate);
                return current && current < moment(customDate, "DD-MM-YYYY HH");
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" shape="round" htmlType="submit">
              Create appointment
            </Button>
          </Form.Item>
        </Form>
      ),
    });
  };

  return (
    <>
      <Modal
        destroyOnClose
        visible={appointmentId !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80vw"
        footer={false}
      >
        <AppointmentDetailModalComponent
          appointmentData={appointmentData}
          createBooking={createBooking}
        />
      </Modal>
    </>
  );
};

export default AppointmentDetailModalContainer;
