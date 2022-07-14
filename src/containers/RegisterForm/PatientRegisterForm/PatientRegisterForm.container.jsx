import React from "react";
import { notification } from "antd";
import { patientRegister } from "../../../services/teeth-apis/RegisterController";
import { useHistory } from "react-router-dom";
import PatientRegisterForm from "../../../components/forms/PatientRegisterForm/PatientRegisterForm.component";
import PatientFormValueToPatientRegisterData from "../../../mapper/PatientFormValueToPatientRegisterData";
import RoutePath from "../../../routers/Path";

const PatientRegisterFormContainer = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      await patientRegister(PatientFormValueToPatientRegisterData(values));
      history.push(RoutePath.LOGIN_PAGE);
      notification["success"]({
        message: `Register successfully`,
        duration: 2,
      });
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
      <PatientRegisterForm onFinish={onFinish} />
    </>
  );
};

export default PatientRegisterFormContainer;
