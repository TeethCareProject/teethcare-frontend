import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import LoginFormContainer from "../../containers/LoginForm/LoginForm.container";
import "./LoginPage.style.scss";

export const redirectMainPage = (history, role) => {
  switch (role) {
    case "ADMIN":
      history.push("/admin-dashboard");
      break;
    case "PATIENT":
      history.push("/patient-patient");
      break;
    case "MANAGER":
      history.push("/manager-dashboard");
      break;
    case "DENTIST":
      history.push("/dentist-dashboard");
      break;
    case "CUSTOMER_SERVICE":
      history.push("/cs-dashboard");
      break;
    default:
      break;
  }
};

const LoginPage = () => {
  const history = useHistory();
  const isAuthUser = useSelector((state) => state.authentication.isAuthUser);
  const role = useSelector((state) => state.authentication.user?.roleName);

  if (isAuthUser) {
    redirectMainPage(history, role);
  }

  return (
    <div className="page login-page">
      <div className="login-container">
        <Typography.Title>Login</Typography.Title>
        <div style={{ width: "30%", margin: "3rem auto" }}>
          <LoginFormContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
