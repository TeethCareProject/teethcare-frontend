import {
  Col,
  notification,
  Row,
  Select,
  Form,
  Input,
  Button,
  Pagination,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import { getAllStaffs } from "../../services/teeth-apis/StaffController";
import StaffManagementTableColumn from "./StaffManagementTable.column";
import { useSelector } from "react-redux";
import CreateStaffModalContainer from "../CreateStaffModal/CreateStaffModal.container";
import { useForm } from "antd/lib/form/Form";
import DetailForm from "../DetailForm/DetailForm.container";

const StaffManagementTableContainer = () => {
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [neededStaff, setNeededStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );

  const pageSize = 6;

  const [filterData, setFilterData] = useState({
    id: null,
    role: null,
    fullName: null,
  });

  const onFinish = async (values) => {
    setFilterData({
      id: values.id,
      role: values.role,
      fullName: values.fullName,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      id: null,
      role: null,
      fullName: null,
    });
    setFilterData({
      id: null,
      role: null,
      fullName: null,
    });
  };

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllStaffs({ clinicId, pageSize: null })).data;
      } else {
        data = (await getAllStaffs({ clinicId, ...options })).data;
      }
      setTotalElements(data.totalElements);
      //map handle Action in here
      const accountData = data?.content.map((account) => ({
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
      <Typography.Title level={3}>Staff Manager</Typography.Title>
      <SearchStaffFormComponent
        form={form}
        onFinish={onFinish}
        resetAction={resetAction}
      />
      <DetailForm
        accountId={neededStaff}
        setNeededAccount={setNeededStaff}
        fetchData={fetchData}
        setCurrentPage={setCurrentPage}
      ></DetailForm>
      <CreateStaffModalContainer />
      <CommonTableComponent
        style={{ marginBottom: 20 }}
        columns={StaffManagementTableColumn}
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

const SearchStaffFormComponent = ({ resetAction, type, ...antdProps }) => {
  const { Option } = Select;
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={4}>
          <Form.Item name="id" label="Search staff Id">
            <Input placeholder="Search by staff Id" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="fullName" label="Search full name">
            <Input placeholder="Search by full name" />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item name="role" label="Search role">
            <Select placeholder="select role">
              <Option>None</Option>
              {Object.keys({
                CUSTOMER_SERVICE: "CUSTOMER_SERVICE",
                DENTIST: "DENTIST",
              }).map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default StaffManagementTableContainer;
