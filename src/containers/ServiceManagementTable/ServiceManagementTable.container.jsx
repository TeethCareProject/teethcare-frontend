import {
  Pagination,
  notification,
  Form,
  Col,
  Row,
  Input,
  Button,
  Select,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import { getAllServices } from "../../services/teeth-apis/ServiceController";
import { useForm } from "antd/lib/form/Form";
import ServiceManagementTableColumn from "./ServiceManagementTable.column";
import DetailForm from "../DetailForm/DetailForm.container";
import { RoleConstant } from "../../constants/RoleConstants";
import { ServiceStatusConstants } from "../../constants/ServiceStatusConstants";
import ServiceFormContainer from "../ServiceForm/ServiceForm.container";

const ServiceManagementTableContainer = () => {
  const [form] = useForm();

  const [data, setData] = useState([]);
  const [neededService, setNeededService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 6;

  const [filterData, setFilterData] = useState({
    id: null,
    status: null,
    name: null,
  });

  const onFinish = async (values) => {
    setFilterData({
      id: values.id,
      status: values.status,
      name: values.name,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      id: null,
      status: null,
      name: null,
    });
    setFilterData({
      id: null,
      status: null,
      name: null,
    });
  };

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllServices({ pageSize: null })).data;
      } else {
        data = (await getAllServices({ ...options })).data;
      }
      setTotalElements(data.totalElements);
      //map handle Action in here
      const serviceData = data?.content.map((service) => ({
        ...service,
        getDetail: () => {
          setNeededService(service.id);
        },
      }));

      setData(serviceData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching service data, try again later`,
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
    <div>
      <SearchServiceFormComponent
        form={form}
        onFinish={onFinish}
        resetAction={resetAction}
      />
      <Modal
        title="Service detail"
        visible={neededService}
        footer={false}
        onCancel={() => setNeededService(null)}
      >
        {neededService ? (
          <ServiceFormContainer
            serviceId={neededService}
            handleSubmit={() => {}}
          />
        ) : null}
      </Modal>
      <CommonTableComponent
        tableTitle="Service Management"
        columns={ServiceManagementTableColumn}
        dataSource={data}
        pagination={false}
      />
      <Pagination
        total={totalElements}
        current={currentPage}
        pageSize={pageSize}
        onChange={onPageChange}
      />
    </div>
  );
};

const SearchServiceFormComponent = ({ resetAction, ...antdProps }) => {
  const { Option } = Select;
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={6}>
          <Form.Item name="id" label="Search service Id">
            <Input placeholder="Search by service Id" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="name" label="Search service name">
            <Input placeholder="Search by service name" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="status" label="Search status">
            <Select placeholder="select status">
              <Option>None</Option>
              {Object.keys(ServiceStatusConstants).map((status) => (
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

export default ServiceManagementTableContainer;
