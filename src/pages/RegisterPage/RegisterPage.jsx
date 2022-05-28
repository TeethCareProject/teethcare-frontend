import React, { Fragment } from "react";
import { Tabs } from "antd";
import registerImg from "../../assets/register_image.png";

import UserRegisterForm from "../../components/forms/UserRegisterForm/UserRegisterForm";
import ClinicRegisterForm from "../../components/forms/ClinicRegisterForm/ClinicRegisterForm";

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
              <UserRegisterForm />
            </TabPane>
            <TabPane tab="Manager" key="2">
              <ClinicRegisterForm />
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
