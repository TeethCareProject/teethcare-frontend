import React, { Fragment } from "react";
import { Tabs } from "antd";
import registerImg from "../../assets/register_image.png";

import UserForm from "../../components/UserForm/UserForm";
import ClinicForm from "../../components/ClinicForm/ClinicForm";

import "./RegisterPage.style.css";

const RegisterPage = () => {
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <Fragment>
      <div className="register-page">
        <div className="register-form-container">
          <div className="title">Teethcare</div>
          <h2>
            Visit our <a href="/">Homepage</a>
          </h2>
          <h2>
            Already have an account? <a href="/login">Login</a>
          </h2>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="User" key="1">
              <UserForm />
            </TabPane>
            <TabPane tab="Manager" key="2">
              <ClinicForm />
            </TabPane>
          </Tabs>
        </div>
        <div className="page-image">
          <img src={registerImg} alt="registerImg" />
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
