import React, { useEffect, useState } from "react";
import { Modal, notification } from "antd";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import DentistPickingModalColumn from "./DentistPickingModal.column";
import { getAllDentists } from "../../services/teeth-apis/DentistController";
import { useSelector } from "react-redux";

const DentistPickingModalContainer = ({
  isDentistModalOpened,
  dentistModalClickHandler,
  form,
}) => {
  const [dentists, setDentists] = useState();

  const clinicId = useSelector(
    (state) => state.authentication.user?.clinic?.id
  );

  const selectDentist = (dentist) => {
    form.setFieldsValue({
      dentistId: dentist,
    });
  };

  const fetchDentist = async () => {
    try {
      const { data } = await getAllDentists({
        clinicId,
        isPageable: false,
      });
      const dentistData = data?.content?.map((dentist, index) => ({
        ...dentist,
        chooseDentistHandler: () => {
          dentistModalClickHandler();
          selectDentist(dentist);
        },
      }));
      setDentists(dentistData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching booking data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchDentist();
  }, []);

  const handleCancel = () => {
    dentistModalClickHandler();
  };

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
          dataSource={dentists}
        />
      </Modal>
    </>
  );
};

export default DentistPickingModalContainer;
