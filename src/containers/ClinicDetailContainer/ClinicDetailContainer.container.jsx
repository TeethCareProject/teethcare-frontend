import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import ClinicDetailComponent from "../../components/customized-components/ClinicDetailComponent/ClinicDetail.component";
import { getClinicById } from "../../services/teeth-apis/ClinicController";
import { getClinicFeedBackAPI } from "../../services/teeth-apis/FeedbackController";
import RoutePath from "../../routers/Path";

import "./ClinicDetailContainer.style.scss";

const ClinicDetailContainer = ({ clinicId }) => {
  const history = useHistory();
  const [currentClinic, setCurrentClinic] = useState({});
  const [feedback, setFeedback] = useState([]);

  const getClinic = async () => {
    try {
      const { data } = await getClinicById(clinicId);
      setCurrentClinic(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching clinic data, try again later`,
        duration: 2,
      });
    }
  };

  const getClinicFeedback = async () => {
    try {
      const { data } = await getClinicFeedBackAPI(clinicId);
      setFeedback(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching feedbacks, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    getClinic();
    getClinicFeedback();
  }, []);

  const onClick = (serviceId) =>
    history.push(RoutePath.CLINIC_PAGE + "/" + clinicId + "/" + serviceId);

  return (
    <div className="clinic-detail-page-container">
      <ClinicDetailComponent
        currentClinic={currentClinic}
        feedback={feedback}
        onClick={onClick}
      />
    </div>
  );
};

export default ClinicDetailContainer;
