import { Button, Collapse, Form, Modal, notification, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FeedbackDetailModalComponent from "../../components/FeedbackDetailModal/FeedbackDetailModal.component";
import FeedbackStatusConstants from "../../constants/FeedbackStatusConstants";
import { RoleConstant } from "../../constants/RoleConstants";
import QRCode from "react-qr-code";
import { getFeedbackById } from "../../services/teeth-apis/FeedbackController";
import { generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { reportFeedback } from "../../services/teeth-apis/ReportController";
import TextArea from "antd/lib/input/TextArea";

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

  const handleReport = async (values) => {
    try {
      await reportFeedback(feedbackId, values.detail);
      notification["success"]({
        message: `Report successfully!`,
        description: `You have reported this feedback successfully, please wait for admin evaluation`,
        duration: 2,
      });
      await fetchFeedbackData();
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching assigning, try again later`,
        duration: 2,
      });
    }
  };

  return (
    <Modal
      destroyOnClose
      visible={feedbackId !== null}
      onOk={handleOk}
      onCancel={handleCancel}
      width="80vw"
      footer={false}
    >
      {/*TODO: show feedback detail*/}
      {/* <FeedbackDetailModalComponent feedbackData={feedbackData} /> */}
      <div>Feedback detail will be here!</div>
      <Collapse>
        <Panel header="Feedback report" key="1">
          {/*TODO: show current feedback report*/}
          {true ? (
            <>
              <Form onFinish={handleReport}>
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
          ) : null}
        </Panel>
      </Collapse>
    </Modal>
  );
};

export default FeedbackDetailModalContainer;
