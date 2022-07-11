import { Form, Col, Row, Input, Button, Select } from "antd";

import { RoleConstant } from "../../constants/RoleConstants";
import { AccountStatusConstants } from "../../constants/AccountStatusConstants";

const SearchAccountFormComponent = ({ resetAction, type, ...antdProps }) => {
  const { Option } = Select;
  return (
    <Form layout="vertical" {...antdProps}>
      <Row gutter={[16, 16]} align="bottom">
        <Col span={4}>
          <Form.Item name="id" label="Search user Id">
            <Input placeholder="Search by user Id" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="fullName" label="Search full name">
            <Input placeholder="Search by full name" />
          </Form.Item>
        </Col>

        {type === AccountStatusConstants.PENDING ? null : (
          <>
            <Col span={4}>
              <Form.Item name="status" label="Search status">
                <Select placeholder="select status">
                  <Option>None</Option>
                  {Object.keys(AccountStatusConstants).map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="role" label="Search role">
                <Select placeholder="select role">
                  <Option>None</Option>
                  {Object.keys(RoleConstant).map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </>
        )}
        <Col span={3}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button onClick={resetAction}>Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchAccountFormComponent;
