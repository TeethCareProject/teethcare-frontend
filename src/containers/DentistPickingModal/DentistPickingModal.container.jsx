import { Avatar, Col, Descriptions, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import { getAllDentists } from "../../services/teeth-apis/DentistController";
import DentistPickingModalColumn from "./DentistPickingModal.column";
import { useSelector } from "react-redux";

const DentistPickingModalContainer = ({
  isOpened,
  setIsOpened,
  modalClickHandler,
  setSelectedDentistId,
}) => {
  const [data, setData] = useState([]);
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );

  const handleCancel = () => {
    modalClickHandler();
  };
  const fetchData = async () => {
    try {
      const { data } = await getAllDentists({ clinicId });

      //map handle Action in here
      const dentistData = data?.content?.map((dentist, index) => ({
        ...dentist,
        chooseDentistHandler: (e) => {
          modalClickHandler(e);
          setSelectedDentistId(dentist.id);
        },
      }));

      setData(dentistData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching account data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          tableTitle="Dentist Management"
          columns={DentistPickingModalColumn}
          dataSource={data}
        />
      </Modal>
    </>
  );
};

//Please move this into a separate file if the logic becomes bigger

export default DentistPickingModalContainer;
