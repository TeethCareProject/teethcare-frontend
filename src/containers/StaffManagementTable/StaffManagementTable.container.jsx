import { Avatar, Col, Descriptions, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  getStaffById,
  getAllStaffs,
} from "../../services/teeth-apis/StaffController";
import { UserOutlined } from "@ant-design/icons";
import StaffManagementTableColumn from "./StaffManagementTable.column";
import { useSelector } from "react-redux";

const StaffManagementTableContainer = () => {
  const [data, setData] = useState([]);
  const [neededStaff, setNeededStaff] = useState(null);
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );

  const fetchData = async () => {
    try {
      const { data } = await getAllStaffs(clinicId);

      //map handle Action in here
      const accountData = data.map((account) => ({
        ...account,
        getDetail: () => {
          setNeededStaff(account.id);
        },
      }));

      setData(accountData);
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
      <DetailForm
        accountId={neededStaff}
        setNeededStaff={setNeededStaff}
      ></DetailForm>
      <CommonTableComponent
        tableTitle="User Management"
        columns={StaffManagementTableColumn}
        dataSource={data}
      />
    </>
  );
};

//Please move this into a separate file if the logic becomes bigger
const DetailForm = ({ accountId, setNeededStaff }) => {
  const [accountDetail, setStaffDetail] = useState({});

  const fetchStaffDetail = async () => {
    try {
      const { data } = await getStaffById(accountId);

      setStaffDetail(data);
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
      fetchStaffDetail();
    }
  }, [accountId]);

  const handleOk = () => {
    setNeededStaff(null);
  };

  const handleCancel = () => {
    setNeededStaff(null);
  };

  return (
    <div>
      <Modal
        destroyOnClose
        visible={accountId !== null}
        onOk={handleOk}
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
      </Modal>
    </div>
  );
};

export default StaffManagementTableContainer;
