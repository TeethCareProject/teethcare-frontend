import React, { useEffect, useState } from "react";
import { Modal, notification } from "antd";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import ServicePickingModalColumn from "./ServicePickingModal.column";
import { getAllServices } from "../../services/teeth-apis/ServiceController";
import { useSelector } from "react-redux";

const ServicePickingModalContainer = ({
  isServiceModalOpened,
  serviceModalClickHandler,
  form,
}) => {
  const [services, setServices] = useState();

  const clinicId = useSelector(
    (state) => state.authentication.user?.clinic?.clinicId
  );

  const selectServices = (services) => {
    form.setFieldsValue({
      serviceIds: services,
    });
  };

  const fetchServices = async () => {
    try {
      const { data } = await getAllServices({
        clinicId,
        isPageable: false,
      });
      const serviceData = data?.content?.map((service, index) => ({
        ...service,
        chooseServiceHandler: () => {
          serviceModalClickHandler();
          selectServices(service);
        },
        isDisabled: form.getFieldValue("serviceIds").includes(service),
      }));
      setServices(serviceData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCancel = () => {
    serviceModalClickHandler();
  };

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
          dataSource={services}
        />
      </Modal>
    </>
  );
};

export default ServicePickingModalContainer;
