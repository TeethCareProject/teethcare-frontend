import React from "react";
import { Form, DatePicker, Button, Input, Typography, Radio } from "antd";
import moment from "moment";
import { CreateAppointmentFormValidation } from "../../validate/CreateAppointmentFormValidation";
const CreateAppointmentFormComponent = ({
  onFinish,
  goToNextExamination,
  form,
  isDisplayed,
  availableHourList,
  handleGetAvailableHourList,
}) => {
  const { TextArea } = Input;

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
            disabledDate={(current) => {
              let customDate = moment().format("DD-MM-YYYY");
              return current && current < moment(customDate, "DD-MM-YYYY");
            }}
            onChange={() => handleGetAvailableHourList()}
          />
        </Form.Item>
        {availableHourList && availableHourList?.length > 0 ? (
          <Form.Item
            name="desiredHour"
            required
            label="Desired time"
            initialValue={availableHourList[0]}
          >
            <Radio.Group
              defaultValue={availableHourList[0]}
              buttonStyle="solid"
            >
              {availableHourList.map((hour) => (
                <Radio.Button value={hour}>{`${hour}:00`}</Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        ) : (
          <Typography>No available time, please choose other day</Typography>
        )}
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
