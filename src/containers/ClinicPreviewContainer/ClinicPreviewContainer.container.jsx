import React, { useState, useLayoutEffect } from "react";
import { notification, Form, Button, Select } from "antd";
import ClinicCardContainer from "../ClinicCardContainer/ClinicCardContainer.container";
import { filterClinicAPI } from "../../services/teeth-apis/ClinicController";
import { getAllServices } from "../../services/teeth-apis/ServiceController";
import { getClinicsAPI } from "../../services/teeth-apis/ClinicController";
import LocationInputContainer from "../LocationInputContainer/LocationInputContainer.container";

import "./ClinicPreviewContainer.style.scss";

const ClinicPreviewContainer = () => {
  const { Option } = Select;

  const [clinics, setClinics] = useState([]);

  const [services, setServices] = useState([]);
  const [filteredClinic, setFilteredClinic] = useState(clinics);
  const [selectedService, setSelectedService] = useState();

  const onFinish = async (values) => {
    try {
      const { data } = await filterClinicAPI(values);
      setFilteredClinic(data.content);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while filter, try again later`,
        duration: 2,
      });
    }
  };

  const getService = async () => {
    try {
      const { data } = await getAllServices();
      setServices(data.content);
    } catch (e) {
      notification["error"]({
        message: e,
        duration: 2,
      });
    }
  };

  const getClinic = async () => {
    try {
      const { data } = await getClinicsAPI();
      setClinics(data);
      console.log(data);
    } catch (e) {
      notification["error"]({
        message: e,
        duration: 2,
      });
    }
  };

  useLayoutEffect(() => {
    getService();
    getClinic();
    onFinish();
  }, []);

  const handleServiceChange = (e) => {
    setSelectedService(e);
  };

  return (
    <div className="clinic-page">
      <div className="clinic-filter-part">
        <div>
          <div className="clinic-filter-part-title">
            Find a dental clinic for yourself
          </div>
          <div className="clinic-filter-part-subtitle">
            Best offer guaranteed
          </div>
        </div>
        <div>
          <Form
            name="clinic-filter"
            className="clinic-filter"
            onFinish={onFinish}
          >
            <Form.Item name="serviceId" label="Service">
              <Select
                value={selectedService}
                onChange={handleServiceChange}
                placeholder="Select services"
              >
                <Option value="">None</Option>
                {services?.map((element, index) => (
                  <Option key={index} value={element.id}>
                    {element.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <LocationInputContainer />

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                size="large"
                className="search-clinic-button"
              >
                Search for clinics
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <ClinicCardContainer
        clinicData={filteredClinic}
        layoutDirection="column"
      />
    </div>
  );
};

export default ClinicPreviewContainer;
