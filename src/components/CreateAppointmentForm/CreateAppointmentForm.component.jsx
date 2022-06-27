import React from "react";
import { Form, DatePicker, Button, Input, Typography } from "antd";
import moment from "moment";
import { getDisabledTime } from "../../utils/convert.utils";
import { useSelector } from "react-redux";
import { CreateAppointmentFormValidation } from "../../validate/CreateAppointmentFormValidation";
import ClinicOperatingTimeMapper from "../../mapper/ClinicOperatingTimeMapper";

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
    disabledHours: () => getDisabledTime(ClinicOperatingTimeMapper(clinic)),
  });

  return (
    <>
      <Typography.Title level={4}>
        Create appointment for next examination:
      </Typography.Title>
      <Form name="create_appointment_form" onFinish={onFinish} form={form}>
        <Form.Item name="note" rules={CreateAppointmentFormValidation.note}>
          <TextArea
            rows={12}
            placeholder="Note for next treatment"
            maxLength={1000}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          name="appointmentDate"
          label="Appointment day:"
          rules={CreateAppointmentFormValidation.appointmentDate}
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
            marginTop: 20,
            marginBottom: 20,
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
    </>
  );
};

export default CreateAppointmentFormComponent;
