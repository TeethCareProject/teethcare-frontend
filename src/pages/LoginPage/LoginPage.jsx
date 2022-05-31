import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import LoginFormContainer from "../../containers/LoginForm/LoginForm.container";
import RoutePath from "../../routers/Path";
import "./LoginPage.style.scss";

const LoginPage = () => {
  const history = useHistory();
  const isAuthUser = useSelector((state) => state.authentication.isAuthUser);

  if (isAuthUser) {
    history.push(RoutePath.DASHBOARD_PAGE);
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
