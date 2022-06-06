import {
  Pagination,
  notification,
  Form,
  Col,
  Row,
  Input,
  Button,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import { getAllAccounts } from "../../services/teeth-apis/AccountController";
import AccountManagementTableColumn from "./AccountManagementTable.column";
import DetailForm from "../DetailForm/DetailForm.container";
import { RoleConstant } from "../../constants/RoleConstants";
import { AccountStatusConstants } from "../../constants/AccountStatusConstants";

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
      <SearchAccountFormComponent onFinish={onFinish} />
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

const SearchAccountFormComponent = ({ resetAction, ...antdProps }) => {
  const { Option } = Select;
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={6}>
          <Form.Item name="id" label="Search user Id">
            <Input placeholder="Search by user Id" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="fullName" label="Search full name">
            <Input placeholder="Search by full name" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="role" label="Search role">
            <Select placeholder="select role">
              <Option>None</Option>
              {Object.keys(RoleConstant).map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="status" label="Search status">
            <Select placeholder="select status">
              <Option>None</Option>
              {Object.keys(AccountStatusConstants).map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AccountManagementTableContainer;
