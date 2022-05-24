import React, { Fragment } from "react";
import { Form, Input, Button, notification, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginStorageHandler } from "../../redux/authentication/authentication.action";
import { loginAPI } from "../../services/teeth-apis/AuthController";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthUser = useSelector((state) => state.authentication.isAuthUser);
  const role = useSelector((state) => state.authentication.user?.role);

  const redirectMainPage = (role) => {
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
    }
  };

  if (isAuthUser) {
    redirectMainPage(role);
  }

  const onFinish = async (values) => {
    //call api
    try {
      const { data } = await loginAPI(values.username, values.password);
      dispatch(loginStorageHandler(data));
      //go to page
      redirectMainPage(role);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while login, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <Fragment>
      <h1>Login page</h1>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default LoginPage;
