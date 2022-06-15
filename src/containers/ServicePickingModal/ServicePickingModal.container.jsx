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
  const [serviceRender, setServiceRender] = useState(false);

  const clinicId = useSelector(
    (state) => state.authentication.user?.clinic?.id
  );

  const checkSelectedService = (services) =>
    !form
      ?.getFieldValue("serviceIds")
      ?.map((service) => service.id)
      ?.includes(services.id);

  const selectServices = (services) => {
    const prev = form.getFieldValue("serviceIds");
    if (prev && checkSelectedService(services)) {
      form.setFieldsValue({
        serviceIds: [...prev, services],
      });
    } else {
      form.setFieldsValue({
        serviceIds: [services],
      });
    }
    setServiceRender((prev) => !prev);
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
          selectServices(service);
        },
        isDisabled: form
          ?.getFieldValue("serviceIds")
          ?.map((s) => s.id)
          ?.includes(service.id),
      }));
      setServices(serviceData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching service data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    if (isServiceModalOpened) fetchServices();
  }, [isServiceModalOpened, serviceRender]);

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
