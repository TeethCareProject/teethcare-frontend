import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useMemo } from "react";

const ErrorPage = ({ code = 404 }) => {
  const { isAuthUser } = useSelector((state) => state.authentication);
  const history = useHistory();
  const subTitlte = useMemo(() => {
    switch (code) {
      case 403:
        return "Sorry, You can not access this page.";
      case 404:
        return "Sorry, The page you visit does not exist.";
      case 500:
        return "Sorry, something went wrong";
      default:
        return "Sorry, something went wrong.";
    }
  }, [code]);
  return (
    <div className="page" style={{ marginTop: "10rem" }}>
      <Result
        status={code}
        title={code}
        subTitle={subTitlte}
        extra={[
          <Button
            key="backhome-button"
            className="main-button"
            onClick={() => {
              history.push("/");
            }}
            type="default"
            style={{ width: "10rem" }}
          >
            Back to Home
          </Button>,
          !isAuthUser ? (
            <Button
              key="login-button"
              className="main-button"
              onClick={() => {
                history.push("/login");
              }}
              type="primary"
              style={{ width: "10rem" }}
              danger
            >
              Login now
            </Button>
          ) : null,
        ]}
      />
    </div>
  );
};
export default ErrorPage;
