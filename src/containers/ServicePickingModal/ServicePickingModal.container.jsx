import { Modal } from "antd";
import React from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import ServicePickingModalColumn from "./ServicePickingModal.column";

const ServicePickingModalContainer = ({
  isOpened,
  dentistModalClickHandler,
  setSelectedServiceIds,
  onChange,
  services,
}) => {
  const handleCancel = () => {
    dentistModalClickHandler();
  };

  //map handle Action in here
  const serviceData = services?.map((service, index) => ({
    ...service,
    chooseServiceHandler: (e) => {
      dentistModalClickHandler(e);
      setSelectedServiceIds(service.id);
      onChange(service.id);
    },
  }));

  return (
    <>
      <Modal
        destroyOnClose
        visible={isOpened}
        onOk={handleCancel}
        onCancel={handleCancel}
        width="80vw"
        footer={false}
        tabIndex={0}
      >
        <CommonTableComponent
          tableTitle="Services"
          columns={ServicePickingModalColumn}
          dataSource={serviceData}
        />
      </Modal>
    </>
  );
};

export default ServicePickingModalContainer;
