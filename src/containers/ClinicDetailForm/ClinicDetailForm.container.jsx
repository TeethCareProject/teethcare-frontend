import { Modal, notification, Button } from "antd";
import React, { useEffect, useState } from "react";
import { setAccountStatus } from "../../services/teeth-apis/AccountController";
import { getManagerById } from "../../services/teeth-apis/ManagerController";
import ClinicDetailFormComponent from "../../components/ClinicDetailForm/ClinicDetailForm.component";
import { AccountStatusConstants } from "../../constants/AccountStatusConstants";

const ClinicDetailForm = ({ accountId, setNeededAccount, fetchData }) => {
  const [accountDetail, setAccountDetail] = useState({});

  const fetchAccountDetail = async () => {
    try {
      const { data } = await getManagerById(accountId);
      setAccountDetail(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching account data, try again later`,
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
      if (status === AccountStatusConstants.ACTIVE) {
        await setAccountStatus(AccountStatusConstants.INACTIVE, accountId);
      } else {
        await setAccountStatus(AccountStatusConstants.ACTIVE, accountId);
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
            ? AccountStatusConstants.INACTIVE
            : AccountStatusConstants.ACTIVE}
        </Button>
      </Modal>
    </div>
  );
};

export default ClinicDetailForm;
