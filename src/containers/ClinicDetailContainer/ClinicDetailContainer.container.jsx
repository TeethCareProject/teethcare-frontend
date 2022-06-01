import React, { useState, useEffect } from "react";

import { notification } from "antd";
import ClinicDetailComponent from "../../components/customized-components/ClinicDetailComponent/ClinicDetail.component";
import { getClinicById } from "../../services/teeth-apis/ClinicController";

import "./ClinicDetailContainer.style.scss";

const ClinicDetailContainer = ({ clinicId }) => {
  const [currentClinic, setCurrentClinic] = useState({});

  useEffect(() => {
    const getClinic = async () => {
      try {
        const { data } = await getClinicById(clinicId);
        setCurrentClinic(data);
      } catch (e) {
        notification["error"]({
          message: `Something went wrong! Try again latter!`,
          description: `There is problem while fetching clinic, try again later`,
          duration: 2,
        });
      }
    };
    getClinic();
  }, []);
  return (
    <div className="clinic-detail-page-container">
      <ClinicDetailComponent currentClinic={currentClinic} />
    </div>
  );
};

export default ClinicDetailContainer;
