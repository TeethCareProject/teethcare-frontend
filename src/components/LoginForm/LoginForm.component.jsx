import React, { Fragment } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import LoginValidation from "../../validate/LoginValidation";

const LoginFormComponent = ({ onFinish }) => {
  return (
    <Fragment>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item name="username" rules={LoginValidation.username}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item name="password" rules={LoginValidation.password}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* TODO: add later */}
        {/* <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ padding: "0 50px", borderRadius: 20 }}
            >
              Log in
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default LoginFormComponent;
