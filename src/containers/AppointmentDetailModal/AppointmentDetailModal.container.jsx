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
import { useSelector } from "react-redux";
import AppointmentDetailModalComponent from "../../components/AppointmentDetailModal/AppointmentDetailModal.component";

const AppointmentDetailModalContainer = () => {
  return (
    <div>
      <AppointmentDetailModalComponent />
    </div>
  );
};

export default AppointmentDetailModalContainer;
