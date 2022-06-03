import React, { useState, useLayoutEffect, useEffect } from "react";
import { notification, Form, Button, Select, Pagination } from "antd";
import ClinicCardContainer from "../ClinicCardContainer/ClinicCardContainer.container";
import { getAllServices } from "../../services/teeth-apis/ServiceController";
import { getClinics } from "../../services/teeth-apis/ClinicController";
import LocationInputContainer from "../LocationInputContainer/LocationInputContainer.container";

import "./ClinicCardListContainer.style.scss";

const ClinicCardListContainer = () => {
  const { Option } = Select;
  const [filterData, setFilterData] = useState({
    serviceId: null,
    provinceId: "",
    districtId: "",
    wardId: "",
  });
  const [services, setServices] = useState([]);
  const [filteredClinic, setFilteredClinic] = useState([]);
  const [selectedService, setSelectedService] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 6;

  const onFinish = async (values) => {
    setFilterData({
      serviceId: values.serviceId,
      provinceId: values.provinceId,
      districtId: values.districtId,
      wardId: values.wardId,
    });
  };

  const fetchingService = async () => {
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

  const fetchingClinic = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getClinics({ pageSize: null })).data;
      } else {
        data = (await getClinics({ ...options })).data;
      }

      setFilteredClinic(data.content);
      setTotalElements(data.totalElements);
    } catch (e) {
      notification["error"]({
        message: e,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchingClinic({ size: pageSize, ...filterData });
    setCurrentPage(1);
  }, [filterData]);

  useEffect(() => {
    fetchingClinic({ size: pageSize, page: currentPage - 1, ...filterData });
  }, [currentPage]);

  useLayoutEffect(() => {
    Promise.all([fetchingService(), fetchingClinic()]).catch(function (err) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2,
      });
    });
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
                <Option>None</Option>
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
      <Pagination
        style={{ position: "fixed", left: "60px", bottom: "60px" }}
        total={totalElements}
        current={currentPage}
        pageSize={3}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default ClinicCardListContainer;
