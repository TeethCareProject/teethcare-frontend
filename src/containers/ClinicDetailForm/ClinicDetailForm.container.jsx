import { Modal, notification, Button } from "antd";
import React, { useEffect, useState } from "react";
import { setAccountStatus } from "../../services/teeth-apis/AccountController";
import { getManagerById } from "../../services/teeth-apis/ManagerController";
import ClinicDetailFormComponent from "../../components/ClinicDetailForm/ClinicDetailForm.component";

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

  const handleOk = () => {
    setNeededAccount(null);
  };

  const handleCancel = () => {
    setNeededAccount(null);
  };

  const handleUpdateStatus = async (status) => {
    try {
      await setAccountStatus(status, accountId);
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
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <ClinicDetailFormComponent accountDetail={accountDetail} />
        {accountDetail.status === "ACTIVE" ? (
          <Button
            onClick={() =>
              handleUpdateStatus({
                status: "INACTIVE",
              })
            }
          >
            Deactivate
          </Button>
        ) : (
          <Button
            onClick={() =>
              handleUpdateStatus({
                status: "ACTIVE",
              })
            }
          >
            Activate
          </Button>
        )}
      </Modal>
    </div>
  );
};

export default ClinicDetailForm;
