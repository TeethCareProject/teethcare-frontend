import {
  Button,
  Col,
  Descriptions,
  Modal,
  notification,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AccountStatusConstants } from "../../constants/AccountStatusConstants";
import ReportStatusConstants from "../../constants/ReportStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";
import {
  evaluateReport,
  getReportById,
} from "../../services/teeth-apis/ReportController";

const ReportDetailForm = ({ reportId, setNeededReport }) => {
  const [reportDetail, setReportDetail] = useState({});
  const role = useSelector((state) => state?.authentication?.user?.roleName);

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

  const handleEvaluateReport = async (reportId, status) => {
    try {
      await evaluateReport(reportId, status);
      setNeededReport(null);
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

  const handleCancel = () => {
    setNeededReport(null);
  };

  return (
    <div>
      <Modal
        destroyOnClose
        visible={reportId !== null}
        footer={false}
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
                {reportDetail?.feedbackResponse?.patient?.firstName +
                  " " +
                  reportDetail?.feedbackResponse?.patient?.lastName}
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
        {role === RoleConstant.CUSTOMER_SERVICE &&
        reportDetail.status === ReportStatusConstants.PENDING ? (
          <Space>
            <Button
              onClick={() => {
                handleEvaluateReport(
                  reportDetail.id,
                  ReportStatusConstants.REJECTED
                );
              }}
            >
              Reject
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleEvaluateReport(
                  reportDetail.id,
                  ReportStatusConstants.APPROVED
                );
              }}
            >
              Approve
            </Button>
          </Space>
        ) : null}
      </Modal>
    </div>
  );
};

export default ReportDetailForm;
