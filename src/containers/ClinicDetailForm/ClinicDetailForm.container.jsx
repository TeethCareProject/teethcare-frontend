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
import { setAccountStatus } from "../../services/teeth-apis/AccountController";
import { getManagerById } from "../../services/teeth-apis/ManagerController";
import { UserOutlined } from "@ant-design/icons";

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
        <Row>
          <Col span={6}>
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
          <Col span={9}>
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
              <Descriptions.Item label="Email" span={12}>
                {accountDetail.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone number" span={12}>
                {accountDetail.phone}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={8}>
            <Descriptions>
              <Descriptions.Item label="Clinic's Name" span={8}>
                {accountDetail?.clinic?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Clinic's Tax Code" span={8}>
                {accountDetail?.clinic?.taxCode}
              </Descriptions.Item>
              <Descriptions.Item label="Clinic's Address" span={8}>
                {accountDetail?.clinic?.location?.address}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
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
