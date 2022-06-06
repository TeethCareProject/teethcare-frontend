import { Col, Descriptions, Modal, notification, Row, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  getReportById,
  getAllReports,
} from "../../services/teeth-apis/ReportController";
import ReportManagementTableColumn from "./ReportManagementTable.column";
import SearchReportFormComponent from "../../components/SearchReportForm/SearchReportForm.component";

const ReportManagementTableContainer = () => {
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

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getAllReports({ pageSize: null })).data;
        console.log(data);
      } else {
        data = (await getAllReports({ ...options })).data;
        console.log(data);
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
    <>
      <SearchReportFormComponent onFinish={onFinish} />
      <DetailForm
        reportId={neededReport}
        setNeededReport={setNeededReport}
      ></DetailForm>
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
    </>
  );
};

//Please move this into a separate file if the logic becomes bigger
const DetailForm = ({ reportId, setNeededReport }) => {
  const [reportDetail, setReportDetail] = useState({});

  const fetchReportDetail = async () => {
    try {
      const { data } = await getReportById(reportId);
      setReportDetail(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching report data, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    if (reportId) {
      fetchReportDetail();
    }
  }, [reportId]);

  const handleOk = () => {
    setNeededReport(null);
  };

  const handleCancel = () => {
    setNeededReport(null);
  };

  return (
    <div>
      <Modal
        destroyOnClose
        visible={reportId !== null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={24}>
            <Descriptions>
              <Descriptions.Item label="ID" span={12}>
                {reportDetail.id}
              </Descriptions.Item>
              <Descriptions.Item label="Report detail" span={12}>
                {reportDetail.detail}
              </Descriptions.Item>
              <Descriptions.Item label="Feedback user" span={12}>
                {reportDetail?.feedbackResponse?.firstName +
                  " " +
                  reportDetail?.feedbackResponse?.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Feedback detail" span={12}>
                {reportDetail?.feedbackResponse?.detail}
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={12}>
                {reportDetail.status}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ReportManagementTableContainer;
