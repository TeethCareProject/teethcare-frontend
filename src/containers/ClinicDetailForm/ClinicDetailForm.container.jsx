import { Modal, notification, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getManagerById } from "../../services/teeth-apis/ManagerController";
import ClinicDetailFormComponent from "../../components/ClinicDetailForm/ClinicDetailForm.component";
import { AccountStatusConstants } from "../../constants/AccountStatusConstants";
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

  const handleUpdateStatus = async (status) => {
    try {
      if (
        status === AccountStatusConstants.INACTIVE ||
        status === AccountStatusConstants.PENDING
      ) {
        await approveClinic(accountDetail?.clinic?.id);
      } else {
        await rejectClinic(accountDetail?.clinic?.id);
      }
      fetchData();
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
        <Button onClick={() => handleUpdateStatus(accountDetail.status)}>
          {accountDetail.status === AccountStatusConstants.ACTIVE
            ? "Deactivate"
            : "Activate"}
        </Button>
      </Modal>
    </div>
  );
};

export default ClinicDetailForm;
