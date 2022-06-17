import {
  Button,
  Collapse,
  Form,
  Modal,
  notification,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFeedbackById } from "../../services/teeth-apis/FeedbackController";
import { reportFeedback } from "../../services/teeth-apis/ReportController";
import TextArea from "antd/lib/input/TextArea";
import FeedbackDetailComponent from "../../components/FeedbackDetail/FeedbackDetail.component";
import { useForm } from "antd/lib/form/Form";
import ReportStatusConstants from "../../constants/ReportStatusConstants";

const { Panel } = Collapse;

const FeedbackDetailModalContainer = ({ feedbackId, setNeededFeedback }) => {
  const [feedbackData, setFeedbackData] = useState({});
  const role = useSelector((state) => state?.authentication?.user?.roleName);

  const fetchFeedbackData = async () => {
    try {
      const { data } = await getFeedbackById(feedbackId);
      setFeedbackData(data);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching feedback data, try again later`,
        duration: 2,
      });
    }
  };

  const handleOk = () => {
    setNeededFeedback(null);
  };

  const handleCancel = () => {
    setNeededFeedback(null);
  };

  useEffect(() => {
    feedbackId && fetchFeedbackData();
  }, [feedbackId]);

  return (
    <Modal
      destroyOnClose
      visible={feedbackId !== null}
      onOk={handleOk}
      onCancel={handleCancel}
      width="80vw"
      footer={false}
    >
      <FeedbackDetailComponent feedbackData={feedbackData} />
      <Collapse>
        <Panel header="Feedback report" key="1">
          <ReportDisplay
            reportData={feedbackData?.reports}
            fetchFeedbackData={fetchFeedbackData}
            feedbackData={feedbackData}
          />
        </Panel>
      </Collapse>
    </Modal>
  );
};

const ReportDisplay = ({ reportData, fetchFeedbackData, feedbackData }) => {
  const [form] = useForm();

  const handleReport = async (values) => {
    try {
      await reportFeedback(feedbackData?.id, values.detail);
      notification["success"]({
        message: `Report successfully!`,
        description: `You have reported this feedback successfully, please wait for admin evaluation`,
        duration: 2,
      });
      await fetchFeedbackData();
      form.resetFields();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: e.response.data.message[0]
          ? e.response.data.message[0]
          : "There is something wrong, try again later",
        duration: 2,
      });
    }
  };

  switch (reportData?.status) {
    case ReportStatusConstants.PENDING:
      return (
        <>
          <Typography>
            This feedback is already reported, please wait for the reply
          </Typography>
        </>
      );
    case ReportStatusConstants.APPROVED:
      return (
        <>
          <Typography>You have reported this feedback successfully</Typography>
        </>
      );
    case ReportStatusConstants.REJECTED:
    default:
      return (
        <>
          <Form form={form} onFinish={handleReport}>
            <Form.Item label="Detail" name="detail">
              <TextArea
                rows={4}
                placeholder="Explain us why you want to report this feedback"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Report this feedback!
              </Button>
            </Form.Item>
          </Form>
        </>
      );
  }
};

export default FeedbackDetailModalContainer;
