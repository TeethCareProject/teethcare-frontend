import React, { useState, useLayoutEffect, useEffect } from "react";

import { useHistory, generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { FilterOutlined } from "@ant-design/icons";
import {
  notification,
  Form,
  Button,
  Select,
  Pagination,
  Input,
  Modal,
} from "antd";
import ClinicCardContainer from "../ClinicCard/ClinicCard.container";
import { getAllServices } from "../../services/teeth-apis/ServiceController";
import { getClinics } from "../../services/teeth-apis/ClinicController";
import LocationInputContainer from "../LocationInput/LocationInput.container";
import "./ClinicCardListFilter.style.scss";

const ClinicCardListContainer = () => {
  const { Option } = Select;

  const history = useHistory();

  const [filterData, setFilterData] = useState({
    name: null,
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
      name: values.name,
      serviceId: values.serviceId,
      provinceId: values.provinceId,
      districtId: values.districtId,
      wardId: values.wardId,
    });
  };

  const handleClick = (clinicId) => {
    history.push(
      generatePath(RoutePath.CLINIC_DETAIL_PAGE, {
        clinicId,
      })
    );
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

  const toggleFilter = () => {
    Modal.info({
      maskClosable: true,
      closable: true,
      okButtonProps: { style: { display: "none" } },
      content: (
        <div className="clinic-filter-part-mobile">
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
              <Form.Item name="name" label="Name">
                <Input placeholder="Search by clinic's name" />
              </Form.Item>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    size="large"
                    className="search-clinic-button"
                  >
                    Search for clinics
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      ),
    });
  };

  const fetchingClinic = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getClinics({ pageSize: null, status: "ACTIVE" })).data;
      } else {
        data = (await getClinics({ ...options, status: "ACTIVE" })).data;
      }

      const mapperClinicData = data?.content.map((clinic) => ({
        ...clinic,
        onClick: () => handleClick(clinic?.id),
      }));

      setFilteredClinic(mapperClinicData);
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
            <Form.Item name="name" label="Name">
              <Input placeholder="Search by clinic's name" />
            </Form.Item>
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  size="large"
                  className="search-clinic-button"
                >
                  Search for clinics
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="action-group-clinic-page">
        <Pagination
          style={{ position: "fixed", right: "30px", top: "90px" }}
          total={totalElements}
          current={currentPage}
          pageSize={pageSize}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
        <FilterOutlined
          className="filter-icon"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.5rem",
            marginRight: 50,
          }}
          onClick={() => toggleFilter()}
        />
      </div>

      <ClinicCardContainer
        clinicData={filteredClinic}
        layoutDirection="column"
      />
    </div>
  );
};

export default ClinicCardListContainer;
