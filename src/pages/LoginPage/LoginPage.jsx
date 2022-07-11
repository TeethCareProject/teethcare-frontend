/* eslint-disable jsx-a11y/img-redundant-alt */
import { Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import LoginFormContainer from "../../containers/LoginForm/LoginForm.container";
import RoutePath from "../../routers/Path";
import "./LoginPage.style.scss";
import loginImg from "../../assets/login.png";

const LoginPage = () => {
  const history = useHistory();
  const isAuthUser = useSelector((state) => state.authentication.isAuthUser);

  if (isAuthUser) {
    history.push(RoutePath.DASHBOARD_PAGE);
  }

  return (
    <div
      className="page login-page"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div className="login-container" style={{ width: "30%" }}>
        <Typography.Title style={{ color: "#3A8EF6" }}>
          Teethcare
        </Typography.Title>
        <div>
          Visit our{" "}
          <span
            onClick={() => history.push(RoutePath.HOME_PAGE)}
            style={{
              cursor: "pointer",
              color: "#3A8EF6",
              fontWeight: "bold",
            }}
          >
            HomePage
          </span>
        </div>
        <div style={{ marginBottom: 10 }}>
          Do not have an account yet?{" "}
          <span
            onClick={() => history.push(RoutePath.REGISTER_PARE)}
            style={{
              cursor: "pointer",
              color: "#3A8EF6",
              fontWeight: "bold",
            }}
          >
            Register
          </span>
        </div>
        <div style={{ width: "100%" }}>
          <LoginFormContainer />
        </div>
      </div>
      <div className="login-page-image-container">
        <img src={loginImg} alt="login-image" />
      </div>
    </div>
  );
};

export default LoginPage;
