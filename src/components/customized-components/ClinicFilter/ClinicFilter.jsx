import React from "react";
import { Form, Button } from "antd";
import LocationContainer from "../../../containers/LocationContainer/LocationContainer.container";
import "./ClinicFilter.style.scss";

const ClinicFilter = ({ onFinish }) => {
  return (
    <div className="clinic-filter-part">
      <div>
        <div className="clinic-filter-part-title">
          Find a dental clinic for yourself
        </div>
        <div className="clinic-filter-part-subtitle">Best offer guaranteed</div>
      </div>
      <div>
        <Form
          name="clinic-filter"
          className="clinic-filter"
          onFinish={onFinish}
        >
          <LocationContainer />
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
  );
};

export default ClinicFilter;
