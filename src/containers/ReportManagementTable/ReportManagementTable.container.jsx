import { Col, Descriptions, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import CommonTableComponent from "../../components/CommonTable/CommonTable.component";
import {
  getReportById,
  getAllReports,
} from "../../services/teeth-apis/ReportController";
import ReportManagementTableColumn from "./ReportManagementTable.column";

const ReportManagementTableContainer = () => {
  const [data, setData] = useState([]);
  const [neededReport, setNeededReport] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await getAllReports();

      //map handle Action in here
      const reportData = data.map((report) => ({
        ...report,
        getDetail: () => {
          setNeededReport(report.id);
        },
      }));

      setData(reportData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching report data, try again later`,
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
        reportId={neededReport}
        setNeededReport={setNeededReport}
      ></DetailForm>
      <CommonTableComponent
        tableTitle="Report Management"
        columns={ReportManagementTableColumn}
        dataSource={data}
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
