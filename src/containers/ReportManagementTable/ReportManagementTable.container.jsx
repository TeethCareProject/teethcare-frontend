import React, { useEffect, useState } from "react";
import { notification, Pagination, Col, Row, Input, Button, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import { getAllReports } from "../../services/teeth-apis/ReportController";
import ReportManagementTableColumn from "./ReportManagementTable.column";
import ReportDetailForm from "../ReportDetailForm/ReportDetailForm.container";

const ReportManagementTableContainer = () => {
  const [form] = useForm();
  const [data, setData] = useState([]);
  const [neededReport, setNeededReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 6;

  const [filterData, setFilterData] = useState({
    id: null,
    clinicName: null,
  });

  const onFinish = async (values) => {
    setFilterData({
      id: values.id,
      clinicName: values.clinicName,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      id: null,
      clinicName: null,
    });
    setFilterData({
      id: null,
      clinicName: null,
    });
  };

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllReports({ pageSize: null })).data;
      } else {
        data = (await getAllReports({ ...options })).data;
      }
      setTotalElements(data.totalElements);
      //map handle Action in here
      const reportData = data?.content.map((report) => ({
        ...report,
        getDetail: () => {
          setNeededReport(report.id);
        },
      }));

      setData(reportData);
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
    <div>
      <SearchReportFormComponent
        form={form}
        onFinish={onFinish}
        resetAction={resetAction}
      />
      <ReportDetailForm
        reportId={neededReport}
        setNeededReport={setNeededReport}
      ></ReportDetailForm>
      <CommonTableComponent
        tableTitle="Report Management"
        columns={ReportManagementTableColumn}
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

const SearchReportFormComponent = ({ resetAction, ...antdProps }) => {
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={6}>
          <Form.Item name="id" label="Search report Id">
            <Input placeholder="Search by report Id" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="clinicName" label="Search full name">
            <Input placeholder="Search by clinic name" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default ReportManagementTableContainer;
