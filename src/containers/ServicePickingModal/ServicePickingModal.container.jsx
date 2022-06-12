import { Modal } from "antd";
import React from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import ServicePickingModalColumn from "./ServicePickingModal.column";

const ServicePickingModalContainer = ({
  isServiceModalOpened,
  selectedServiceIds,
  serviceModalClickHandler,
  services,
  chooseService,
}) => {
  const handleCancel = () => {
    serviceModalClickHandler();
  };

  //map handle Action in here
  const serviceData = services?.map((service, index) => ({
    ...service,
    chooseServiceHandler: (e) => {
      chooseService(service.id);
    },
    isDisabled: selectedServiceIds.includes(service.id),
  }));

  return (
    <>
      <Modal
        destroyOnClose
        visible={isServiceModalOpened}
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