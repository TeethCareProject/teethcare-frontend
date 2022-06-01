import React, { useState, useLayoutEffect } from "react";
import { notification } from "antd";
import ClinicFilter from "../../components/customized-components/ClinicFilter/ClinicFilter";
import CardClinicContainer from "../../containers/CardClinicContainer/CardClinicContainer";
import { filterClinicAPI } from "../../services/teeth-apis/ClinicController";
import { useSelector } from "react-redux";
import { getAllServicesAPI } from "../../services/teeth-apis/ServiceController";

import "./ClinicContainer.style.scss";

const ClinicContainer = () => {
  var data = {
    data: {
      content: useSelector((state) => state.clinics.clinics),
    },
  };

  const [services, setServices] = useState([]);
  const [filteredClinic, setFilteredClinic] = useState(
    data.data.content.content
  );
  const [selectedService, setSelectedService] = useState();

  useLayoutEffect(() => {
    const getService = async () => {
      try {
        const { data } = await getAllServicesAPI();
        setServices(data);
      } catch (e) {
        notification["error"]({
          message: e,
          duration: 2,
        });
      }
    };
    getService();
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e);
  };

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
      <ClinicFilter
        onFinish={onFinish}
        services={services}
        selectedService={selectedService}
        handleServiceChange={handleServiceChange}
      />
      <CardClinicContainer
        clinicData={filteredClinic}
        layoutDirection="column"
      />
    </div>
  );
};

export default ClinicContainer;
