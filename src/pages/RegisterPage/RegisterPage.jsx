import React, { Fragment } from "react";
import { Tabs } from "antd";
import registerImg from "../../assets/register_image.png";
import RoutePath from "../../routers/Path";
import PatientRegisterFormContainer from "../../containers/RegisterForm/PatientRegisterForm/PatientRegisterForm.container";
import ClinicRegisterFormContainer from "../../containers/RegisterForm/ClinicRegisterForm/ClinicRegisterForm.container";

import "./RegisterPage.style.css";

const RegisterPage = () => {
  const { TabPane } = Tabs;

  return (
    <Fragment>
      <div className="register-page">
        <div className="register-form-container">
          <div className="title">Teethcare</div>
          <h2>
            Visit our <a href={RoutePath.HOME_PAGE}>Homepage</a>
          </h2>
          <h2>
            Already have an account? <a href={RoutePath.LOGIN_PAGE}>Login</a>
          </h2>
          <Tabs defaultActiveKey="1">
            <TabPane tab="User" key="1">
              <PatientRegisterFormContainer />
            </TabPane>
            <TabPane tab="Manager" key="2">
              <ClinicRegisterFormContainer />
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
