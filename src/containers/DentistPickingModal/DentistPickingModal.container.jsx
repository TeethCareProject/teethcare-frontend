import { Modal } from "antd";
import React from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import DentistPickingModalColumn from "./DentistPickingModal.column";

const DentistPickingModalContainer = ({
  isDentistModalOpened,
  dentistModalClickHandler,
  setSelectedDentistId,
  onDentistChange,
  dentists,
}) => {
  const handleCancel = () => {
    dentistModalClickHandler();
  };

  //map handle Action in here
  const dentistData = dentists?.map((dentist, index) => ({
    ...dentist,
    chooseDentistHandler: (e) => {
      dentistModalClickHandler(e);
      setSelectedDentistId(dentist.id);
      onDentistChange(dentist.id);
    },
  }));

  return (
    <>
      <Modal
        destroyOnClose
        visible={isDentistModalOpened}
        onOk={handleCancel}
        onCancel={handleCancel}
        width="80vw"
        footer={false}
        tabIndex={0}
      >
        <CommonTableComponent
          tableTitle="Dentist Management"
          columns={DentistPickingModalColumn}
          dataSource={dentistData}
        />
      </Modal>
    </>
  );
};

export default DentistPickingModalContainer;
