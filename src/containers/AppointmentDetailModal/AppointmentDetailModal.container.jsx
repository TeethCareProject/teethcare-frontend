import {
  Button,
  Form,
  Modal,
  notification,
  Rate,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { getAppointmentById } from "../../services/teeth-apis/AppointmentController";
import { useSelector } from "react-redux";
import AppointmentDetailModalComponent from "../../components/AppointmentDetailModal/AppointmentDetailModal.component";

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

  const handleOk = () => {
    setNeededAppointment(null);
  };

  const handleCancel = () => {
    setNeededAppointment(null);
  };

  useEffect(() => {
    appointmentId && fetchAppointmentData();
  }, [appointmentId]);

  return (
    <Modal
      destroyOnClose
      visible={appointmentId !== null}
      onOk={handleOk}
      onCancel={handleCancel}
      width="80vw"
      footer={false}
    >
      <AppointmentDetailModalComponent appointmentData={appointmentData} />
    </Modal>
  );
};

export default AppointmentDetailModalContainer;
