import React, { useEffect, useState } from "react";
import { Input, Form, Row, Col, notification, Button, Pagination } from "antd";
import FeedbackListComponent from "../../components/FeedBackList/FeedbackList.component";
import { useForm } from "antd/lib/form/Form";
import { getClinicFeedBack } from "../../services/teeth-apis/FeedbackController";
import { useSelector } from "react-redux";
import FeedbackDetailModalContainer from "../FeedbackDetailModal/FeedbackDetailModal.container";
// import FeedbackDetailModalContainer from "../FeedbackDetailModal/FeedbackDetailModal.container";

const FeedbackListContainer = () => {
  const [searchValue, setSearchValue] = useState({
    feedbackId: "",
  });
  const [feedbackListData, setFeedbackListData] = useState([]);
  const [form] = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [neededFeedback, setNeededFeedback] = useState(null);
  const pageSize = 6;

  const clinicId = useSelector(
    (state) => state?.authentication?.user?.clinic?.id
  );

  const fetchData = async (options) => {
    try {
      let data;
      if (!options) {
        data = (await getClinicFeedBack(clinicId, {})).data;
      } else {
        data = (await getClinicFeedBack(clinicId, { ...options })).data;
      }

      const mapperData = data?.content?.map((feedback) => ({
        ...feedback,
        onClick: () => {
          setNeededFeedback(feedback?.id);
        },
      }));

      setFeedbackListData(mapperData);
      setTotalElements(data.totalElements);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching feedback data, try again later`,
        duration: 2,
      });
    }
  };

  const onFinish = (values) => {
    setSearchValue({
      feedbackId: values.feedbackId,
    });
  };

  const resetAction = () => {
    form.setFieldsValue({
      feedbackId: "",
    });
    setSearchValue({
      feedbackId: "",
    });
  };

  useEffect(() => {
    fetchData({ size: pageSize, ...searchValue });
    setCurrentPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (!neededFeedback) {
      fetchData({ size: pageSize, page: currentPage - 1, ...searchValue });
    }
  }, [neededFeedback]);

  useEffect(() => {
    fetchData({ size: pageSize, page: currentPage - 1, ...searchValue });
  }, [currentPage]);

  return (
    <>
      <SearchForm form={form} onFinish={onFinish} resetAction={resetAction} />
      <FeedbackDetailModalContainer
        feedbackId={neededFeedback}
        setNeededFeedback={setNeededFeedback}
      />
      <FeedbackListComponent feedbackListData={feedbackListData} />
      <div style={{ marginTop: "1rem" }}>
        <Pagination
          total={totalElements}
          current={currentPage}
          pageSize={pageSize}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </>
  );
};

const SearchForm = ({ resetAction, ...antdProps }) => {
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={7}>
          <Form.Item name="feedbackId" label="Search feedback Id">
            <Input placeholder="Search by feedback Id" />
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

export default FeedbackListContainer;
