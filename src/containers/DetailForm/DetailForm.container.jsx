import {
  Avatar,
  Col,
  Descriptions,
  Modal,
  notification,
  Row,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  getAccountById,
  setAccountStatus,
} from "../../services/teeth-apis/AccountController";
import { UserOutlined } from "@ant-design/icons";
import { AccountStatusConstants } from "../../constants/AccountStatusConstants";
import { useSelector } from "react-redux";

const DetailForm = ({
  accountId,
  setNeededAccount,
  fetchData,
  setCurrentPage,
}) => {
  const userId = useSelector((state) => state.authentication?.user?.id);
  const [accountDetail, setAccountDetail] = useState({});
  const fetchAccountDetail = async () => {
    try {
      const { data } = await getAccountById(accountId);
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
      if (
        status === AccountStatusConstants.PENDING ||
        status === AccountStatusConstants.INACTIVE
      ) {
        await setAccountStatus(
          { status: AccountStatusConstants.ACTIVE },
          accountId
        );
      } else {
        await setAccountStatus(
          { status: AccountStatusConstants.INACTIVE },
          accountId
        );
      }

      fetchData();
      setCurrentPage(1);
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
        onCancel={handleCancel}
        footer={null}
      >
        <Row>
          <Col span={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Avatar size={100} icon={<UserOutlined />} />
            </div>
          </Col>
          <Col span={16}>
            <Descriptions>
              <Descriptions.Item label="ID" span={12}>
                {accountDetail.id}
              </Descriptions.Item>
              <Descriptions.Item label="Role" span={12}>
                {accountDetail.roleName}
              </Descriptions.Item>
              <Descriptions.Item label="Name" span={12}>
                {accountDetail.firstName + " " + accountDetail.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Gender" span={12}>
                {accountDetail.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth" span={12}>
                {accountDetail.dateOfBirth}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={12}>
                {accountDetail.status}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        {userId !== accountDetail?.id ? (
          <Button onClick={() => handleUpdateStatus(accountDetail.status)}>
            {accountDetail.status === AccountStatusConstants.ACTIVE
              ? "Deactivate"
              : "Activate"}
          </Button>
        ) : null}
      </Modal>
    </div>
  );
};

export default DetailForm;
