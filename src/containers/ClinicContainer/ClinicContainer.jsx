import React, { useState } from "react";
import { notification } from "antd";
import ClinicFilter from "../../components/customized-components/ClinicFilter/ClinicFilter";
import CardClinicContainer from "../../containers/CardClinicContainer/CardClinicContainer";
import { filterClinicAPI } from "../../services/teeth-apis/ClinicController";
import { useSelector } from "react-redux";

import "./ClinicContainer.style.scss";

const ClinicContainer = () => {
  var data = {
    data: {
      content: useSelector((state) => state.clinics.clinics),
    },
  };
  console.log(data.data.content.content);

  const [filteredClinic, setFilteredClinic] = useState(
    data.data.content.content
  );

  const onFinish = async (values) => {
    try {
      data = await filterClinicAPI(values);
      console.log(data.data.content);
      setFilteredClinic(data.data.content);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while filter, try again later`,
        duration: 2,
      });
    }
  };
  return (
    <div className="clinic-page">
      <ClinicFilter onFinish={onFinish} />
      <CardClinicContainer
        clinicData={filteredClinic}
        layoutDirection="column"
      />
    </div>
  );
};

export default ClinicContainer;
