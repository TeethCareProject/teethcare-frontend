import React from "react";
import { Form, Col, Row, Input, Button, Select } from "antd";
import { RoleConstantArray } from "../../../constants/RoleConstants";
import { AccountStatusConstantsArray } from "../../../constants/AccountStatusConstants";

const SearchAccountForm = ({ resetAction, ...antdProps }) => {
  const { Option } = Select;
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={4}>
          <Form.Item name="id" label="Search user Id">
            <Input placeholder="Search by user Id" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="fullName" label="Search full name">
            <Input placeholder="Search by full name" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="role" label="Search role">
            <Select placeholder="select role">
              <Option>None</Option>
              {RoleConstantArray.map((role) => (
                <Option key={role.value} value={role.value}>
                  {role.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="status" label="Search status">
            <Select placeholder="select status">
              <Option>None</Option>
              {AccountStatusConstantsArray.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.title}
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
        {/* <Col span={2}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col> */}
      </Row>
    </Form>
  );
};

export default SearchAccountForm;
