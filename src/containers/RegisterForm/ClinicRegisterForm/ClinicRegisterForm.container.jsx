import React, { useState } from "react";
import { managerRegister } from "../../../services/teeth-apis/RegisterController";
import { notification } from "antd";
import { useHistory } from "react-router-dom";
import { Button, Steps, Form, Input, TimePicker } from "antd";
import RoutePath from "../../../routers/Path";
import UserInfoInputComponent from "../../../components/forms/UserInfoInput/UserInfoInput.component";

import ClinicRegisterFormComponent from "../../../components/forms/ClinicRegisterForm/ClinicRegisterForm.component";
import ClinicFormValueToClinicRegisterData from "../../../mapper/ClinicFormValueToClinicRegisterData";
import moment from "moment";
import { convertMomentToMilliseconds } from "../../../utils/convert.utils";
import { ClinicRegisterValidation } from "../../../validate/RegisterValidation";

const ClinicRegisterFormContainer = () => {
  const { Step } = Steps;

  const [form] = Form.useForm();
  const [registerData, setRegisterData] = useState({});

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

const OperatingHourFormComponent = () => {
  return (
    <>
      <Form.Item
        name="operatingTimeMorning"
        rules={ClinicRegisterValidation.operatingTimeMorning}
      >
        <TimePicker.RangePicker />
      </Form.Item>
      <Form.Item
        name="operatingTimeEvening"
        rules={ClinicRegisterValidation.operatingTimeEvening}
      >
        <TimePicker.RangePicker />
      </Form.Item>
    </>
  );
};

export default ClinicRegisterFormContainer;
