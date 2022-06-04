import React from "react";
import { dentistCreateAccount } from "../../services/teeth-apis/RegisterController";
import { notification } from "antd";

import DentistCreateFormComponent from "../../components/forms/DentistCreateFormComponent/DentistCreateForm.component";
import DentistFormValueToDentistData from "../../mapper/DentistFormValueToDentistData";

const DentistCreateFormContainer = () => {
  const onFinish = async (values) => {
    try {
      await dentistCreateAccount(DentistFormValueToDentistData(values));
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
      <DentistCreateFormComponent onFinishHandle={onFinish} />
    </>
  );
};

export default DentistCreateFormContainer;
