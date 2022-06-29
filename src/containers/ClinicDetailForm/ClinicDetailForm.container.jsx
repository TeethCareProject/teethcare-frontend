import { Modal, notification, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getManagerById } from "../../services/teeth-apis/ManagerController";
import ClinicDetailFormComponent from "../../components/ClinicDetailForm/ClinicDetailForm.component";
import {
  approveClinic,
  rejectClinic,
} from "../../services/teeth-apis/ClinicController";

const ClinicDetailForm = ({ accountId, setNeededAccount, fetchData }) => {
  const [accountDetail, setAccountDetail] = useState({});

  const fetchAccountDetail = async () => {
    try {
      const { data } = await getManagerById(accountId);
      setAccountDetail(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while update clinic's status, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    if (accountId) {
      fetchAccountDetail();
    }
  }, [accountId]);

  const handleCancel = () => {
    setNeededAccount(null);
  };

  const handleUpdateStatus = async (options) => {
    try {
      if (options === "approve") {
        await approveClinic(accountDetail?.clinic?.id);
      } else {
        await rejectClinic(accountDetail?.clinic?.id);
      }
      notification["success"]({
        message: `Successfully!`,
        duration: 2,
      });
      fetchData();
      setNeededAccount(null);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while update account data, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <div>
      <Modal
        destroyOnClose
        visible={accountId !== null}
        footer={null}
        onCancel={handleCancel}
        width={800}
      >
        <ClinicDetailFormComponent accountDetail={accountDetail} />
        <Space style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => handleUpdateStatus("approve")}>Approve</Button>
          <Button type="danger" onClick={() => handleUpdateStatus("reject")}>
            Reject
          </Button>
        </Space>
      </Modal>
    </div>
  );
};

export default ClinicDetailForm;
