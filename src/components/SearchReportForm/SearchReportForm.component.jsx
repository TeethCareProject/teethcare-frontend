import React from "react";
import { Form, Col, Row, Input, Button } from "antd";

const SearchReportFormComponent = ({ resetAction, ...antdProps }) => {
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={4}>
          <Form.Item name="id" label="Search feedback Id">
            <Input placeholder="Search by feedback Id" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="clinicName" label="Search full name">
            <Input placeholder="Search by clinic name" />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        {/* <Col span={2}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  );
};

export default SearchReportFormComponent;
