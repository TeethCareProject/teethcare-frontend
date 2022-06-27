import React, { useState } from "react";
import { managerRegister } from "../../../services/teeth-apis/RegisterController";
import { notification } from "antd";
import { useHistory } from "react-router-dom";
import { Button, Steps, Form } from "antd";
import RoutePath from "../../../routers/Path";
import UserInfoInputComponent from "../../../components/forms/UserInfoInput/UserInfoInput.component";

import ClinicRegisterFormComponent from "../../../components/forms/ClinicRegisterForm/ClinicRegisterForm.component";
import ClinicFormValueToClinicRegisterData from "../../../mapper/ClinicFormValueToClinicRegisterData";

import OperatingHourFormComponent from "../../../components/forms/ClinicRegisterForm/OperatingHourForm.component";

const ClinicRegisterFormContainer = () => {
  const { Step } = Steps;

  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Manager's Information",
      content: <UserInfoInputComponent />,
    },
    {
      title: "Clinic's Information",
      content: <ClinicRegisterFormComponent />,
    },
    {
      title: "Operating Time",
      content: <OperatingHourFormComponent />,
    },
  ];

  const history = useHistory();

  const onFinish = async () => {
    try {
      await managerRegister(
        ClinicFormValueToClinicRegisterData(form.getFieldsValue(true))
      );
      history.push(RoutePath.LOGIN_PAGE);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while register, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <>
      <Form
        name="normal_register"
        className="manager-register-form"
        onFinish={onFinish}
        form={form}
        style={{ marginBottom: "20px " }}
      >
        <Steps current={current} style={{ marginBottom: "20px " }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Register
              </Button>
            </Form.Item>
          )}
        </div>
      </Form>
    </>
  );
};

export default ClinicRegisterFormContainer;
