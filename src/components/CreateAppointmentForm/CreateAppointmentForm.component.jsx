import React from "react";
import { Form, DatePicker, Button, Input, Typography } from "antd";
import moment from "moment";
import { convertMillisecondsToHour, getDisabledTime } from "../../utils/convert.utils";
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

  const disabledDateTime = (date) => {
    const clinicWorkingTimes = {
      clinicShift1: {
        startTime: clinic?.startTimeShift1,
        endTime: clinic?.endTimeShift1,
      },
      clinicShift2: {
        startTime: clinic?.startTimeShift2,
        endTime: clinic?.endTimeShift2,
      },
    };
    return {
      disabledHours: () => getDisabledTime(ClinicOperatingTimeMapper(clinic)),
      disabledMinutes: () => {
        if (date == null) return;
        for (const shiftName in clinicWorkingTimes) {
          const shift = clinicWorkingTimes[shiftName];
          if (date.hour() == convertMillisecondsToHour(shift.startTime)) {
            const calculatedMinute = Math.floor(
              (shift.startTime % (1000 * 60 * 60)) / (1000 * 60)
            );
            const minutesArr = [];
            for (let i = 0; i <= calculatedMinute; i++) minutesArr.push(i);
            return minutesArr;
          }
          if (date.hour() == convertMillisecondsToHour(shift.endTime)) {
            const calculatedMinute = Math.floor(
              (shift.endTime % (1000 * 60 * 60)) / (1000 * 60)
            );
            const minutesArr = [];
            for (let i = calculatedMinute; i <= 59; i++) minutesArr.push(i);
            return minutesArr;
          }
        }
      },
    };
  };

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
              showTime
              placeholder="Select Time"
              style={{ marginLeft: 10 }}
              disabledTime={disabledDateTime}
              disabledDate={(current) => {
                let customDate = moment().format("DD-MM-YYYY");
                return current && current < moment(customDate, "DD-MM-YYYY");
              }}
              format="YYYY-MM-DD HH:mm"
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
