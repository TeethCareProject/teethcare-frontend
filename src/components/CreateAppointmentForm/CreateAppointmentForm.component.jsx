import React from "react";
import { Col, Form, DatePicker, Button, Input, Typography } from "antd";
import moment from "moment";
import {
  convertMomentToDate,
  getDisabledTime,
} from "../../utils/convert.utils";
import { useSelector } from "react-redux";

const CreateAppointmentFormComponent = ({
  onFinish,
  goToNextExamination,
  form,
  isDisplayed,
}) => {
  const dateFormat = "DD-MM-YYYY HH";
  const { TextArea } = Input;
  const clinic = useSelector((state) => state?.authentication?.user?.clinic);

  const disabledDateTime = () => ({
    disabledHours: () =>
      getDisabledTime(
        clinic?.startTimeShift1,
        clinic?.endTimeShift1,
        clinic?.startTimeShift2,
        clinic?.endTimeShift2
      ),
  });

  return (
    <Col span={12} style={{ margin: "30px 40px" }}>
      <Typography.Title level={4}>
        Create appointment for next examination:
      </Typography.Title>
      <Form name="create_appointment_form" onFinish={onFinish} form={form}>
        <Form.Item name="note">
          <TextArea
            rows={12}
            placeholder="Note for next treatment"
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item
          name="appointmentDate"
          label="Appointment day:"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || convertMomentToDate(value) > Date.now()) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Booking date should be from tomorrow")
                );
              },
            }),
          ]}
        >
          <DatePicker
            showTime={{ format: "HH" }}
            format={`${dateFormat}:00`}
            disabledDate={(current) => {
              let customDate = moment().format("DD-MM-YYYY HH");
              return current && current < moment(customDate, "DD-MM-YYYY HH");
            }}
            disabledTime={disabledDateTime}
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <Form.Item>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              disabled={isDisplayed}
            >
              Create appointment
            </Button>
          </Form.Item>
          <Button
            shape="round"
            onClick={() => goToNextExamination()}
            style={{
              backgroundColor: "#00B507",
              color: "white",
              border: "#00B507",
            }}
          >
            Next examination
          </Button>
        </div>
      </Form>
    </Col>
  );
};

export default CreateAppointmentFormComponent;
