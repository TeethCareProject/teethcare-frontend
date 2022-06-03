import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { generatePath } from "react-router";
import { notification } from "antd";
import ClinicDetailComponent from "../../components/customized-components/ClinicDetailComponent/ClinicDetail.component";
import { getClinicById } from "../../services/teeth-apis/ClinicController";
import { getClinicFeedBackAPI } from "../../services/teeth-apis/FeedbackController";
import RoutePath from "../../routers/Path";

import "./ClinicDetailContainer.style.scss";

const ClinicDetailContainer = () => {
  const { clinicId } = useParams();
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
    Promise.all([getClinic(), getClinicFeedback()]);
  }, []);

  const onClick = (serviceId) =>
    history.push(
      generatePath(RoutePath.SERVICE_PAGE, {
        clinicId: currentClinic.id,
        serviceId,
      })
    );

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
