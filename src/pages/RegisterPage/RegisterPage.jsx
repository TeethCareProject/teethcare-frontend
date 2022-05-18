import React, { Fragment } from "react";
import { Form, Input, Button, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import registerImg from "../../assets/register_image.png";
import "./RegisterPage.css";

const RegisterPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <Fragment>
      <div className="register-page">
        <div className="register-form-container">
          <h1>Teethcare</h1>
          <h2>
            Visit our <a href="/">Homepage</a>
          </h2>
          <h2>
            Already have an account? <a href="/login">Login</a>
          </h2>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="User" key="1">
              <Form
                name="normal_register"
                className="register-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
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
                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your confirmPassword!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Manager" key="2">
              <Form
                name="normal_register"
                className="manager-register-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <div className="user-register-form">
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
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input your confirmPassword!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                </div>
                <div className="hospital-register-form">
                  <Form.Item
                    name="clinicName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Clinic's Name!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Clinic's Name"
                    />
                  </Form.Item>
                  <Form.Item
                    name="clinicTaxCode"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Clinic's Tax Code!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Clinic's Tax Code"
                    />
                  </Form.Item>
                  <Form.Item
                    name="clinicPhoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Clinic's Phone Number!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Clinic's Phone Number"
                    />
                  </Form.Item>
                  <Form.Item
                    name="clinicEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Clinic's Email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Clinic's Email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="clinicAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Clinic's Address!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Clinic's Address"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="register-form-button"
                    >
                      Register
                    </Button>
                  </Form.Item>
                </div>
              </Form>
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
