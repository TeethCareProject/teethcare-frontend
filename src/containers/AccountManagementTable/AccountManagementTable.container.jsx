import {
  Avatar,
  Col,
  Pagination,
  Descriptions,
  Modal,
  notification,
  Row,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  getAccountById,
  getAllAccounts,
  setAccountStatus,
} from "../../services/teeth-apis/AccountController";
import { UserOutlined } from "@ant-design/icons";
import AccountManagementTableColumn from "./AccountManagementTable.column";
import SearchAccountForm from "../../components/customized-components/SearchAccountForm/SearchAccountForm.component";

const AccountManagementTableContainer = () => {
  const [data, setData] = useState([]);
  const [neededAccount, setNeededAccount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 6;

  const [filterData, setFilterData] = useState({
    id: null,
    role: null,
    status: null,
    fullName: null,
  });

  const onFinish = async (values) => {
    setFilterData({
      id: values.id,
      role: values.role,
      status: values.status,
      fullName: values.fullName,
    });
  };

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllAccounts({ pageSize: null })).data;
      } else {
        data = (await getAllAccounts({ ...options })).data;
      }
      setTotalElements(data.totalElements);
      //map handle Action in here
      const accountData = data?.content.map((account) => ({
        ...account,
        getDetail: () => {
          setNeededAccount(account.id);
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
    fetchData({ size: pageSize, ...filterData });
    setCurrentPage(1);
  }, [filterData]);

  useEffect(() => {
    fetchData({ size: pageSize, page: currentPage - 1, ...filterData });
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <SearchAccountForm onFinish={onFinish} />
      <DetailForm
        accountId={neededAccount}
        setNeededAccount={setNeededAccount}
        fetchData={fetchData}
      ></DetailForm>
      <CommonTableComponent
        tableTitle="User Management"
        columns={AccountManagementTableColumn}
        dataSource={data}
        pagination={false}
      />
      <Pagination
        total={totalElements}
        current={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </>
  );
};

//Please move this into a separate file if the logic becomes bigger
const DetailForm = ({ accountId, setNeededAccount, fetchData }) => {
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

export default AccountManagementTableContainer;
