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
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  createVoucher,
  deleteVoucher,
  getAllVouchers,
  updateVoucher,
} from "../../services/teeth-apis/VoucherController";
import { useForm } from "antd/lib/form/Form";
import VoucherManagementTableColumn from "./VoucherManagementTable.column";
import VoucherStatusConstants from "../../constants/VoucherStatusConstants";
import VoucherFormContainer from "../VoucherForm/VoucherForm.container";
import { useSelector } from "react-redux";

const VoucherManagementTableContainer = () => {
  const role = useSelector((state) => state?.authentication?.user?.clinic);

  const [form] = useForm();

  const [data, setData] = useState([]);
  const [neededVoucher, setNeededVoucher] = useState(null);
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
        data = (await getAllVouchers({ pageSize: null })).data;
      } else {
        data = (await getAllVouchers({ ...options })).data;
      }
      setTotalElements(data.totalElements);
      //map handle Action in here
      const voucherData = data?.content.map((voucher) => ({
        ...voucher,
        getDetail: () => {
          setNeededVoucher(voucher?.voucherCode);
        },
        onDelete: () => {
          handleDeleteVoucher(voucher?.voucherCode);
        },
      }));

      setData(voucherData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching voucher data, try again later`,
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

  const handleUpdateVoucher = async (values) => {
    try {
      await updateVoucher({ ...values });
      setNeededVoucher(null);
      setFilterData((preFilter) => ({ ...preFilter }));
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating voucher, try again later`,
        duration: 2,
      });
    }
  };

  const handleCreateVoucher = async (values) => {
    try {
      await createVoucher({
        ...values,
        expiredTime: values?.expiredTime?.valueOf(),
      });
      notification["success"]({
        message: `Create Successfully`,
        description: `Create new voucher succesfully`,
        duration: 2,
      });
      Modal.destroyAll();
      setFilterData((preFilter) => ({ ...preFilter }));
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating voucher, try again later`,
        duration: 2,
      });
    }
  };

  const handleDeleteVoucher = (voucherId) => {
    try {
      Modal.confirm({
        title: "Delete voucher",
        content: "Are you sure you want to delete this voucher?",
        onOk: async () => {
          await deleteVoucher(voucherId);
          notification["success"]({
            message: `Delete Successfully`,
            description: `Delete new voucher succesfully`,
            duration: 2,
          });
          setFilterData((preFilter) => ({ ...preFilter }));
        },
        onCancel: () => {},
      });
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while updating voucher, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <div>
      <SearchVoucherFormComponent
        form={form}
        onFinish={onFinish}
        resetAction={resetAction}
      />
      <Modal
        destroyOnClose={true}
        title="Voucher detail"
        visible={neededVoucher}
        footer={false}
        onCancel={() => setNeededVoucher(null)}
      >
        {neededVoucher ? (
          <VoucherFormContainer
            voucherId={neededVoucher}
            handleSubmit={handleUpdateVoucher}
          />
        ) : null}
      </Modal>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            const modal = Modal.info();
            modal.update({
              closable: true,
              okButtonProps: { style: { display: "none" } },
              title: "Create voucher form",
              content: (
                <VoucherFormContainer
                  voucherId={null}
                  handleSubmit={handleCreateVoucher}
                />
              ),
            });
          }}
        >
          Create voucher
        </Button>
      </Space>
      <CommonTableComponent
        tableTitle="Voucher Management"
        columns={VoucherManagementTableColumn}
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

const SearchVoucherFormComponent = ({ resetAction, ...antdProps }) => {
  const { Option } = Select;
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={6}>
          <Form.Item name="id" label="Search voucher Id">
            <Input placeholder="Search by voucher Id" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="name" label="Search voucher name">
            <Input placeholder="Search by voucher name" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="status" label="Search status">
            <Select placeholder="select status">
              <Option>None</Option>
              {Object.keys(VoucherStatusConstants).map((status) => (
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

export default VoucherManagementTableContainer;
