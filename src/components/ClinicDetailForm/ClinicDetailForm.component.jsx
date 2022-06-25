import React from "react";
import { Avatar, Col, Descriptions, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ClinicDetailFormComponent = ({ accountDetail }) => {
  return (
    <Row>
      <Col span={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Avatar size={100} icon={<UserOutlined />} />
        </div>
      </Col>
      <Col span={9}>
        <Descriptions>
          <Descriptions.Item label="ID" span={12}>
            {accountDetail.id}
          </Descriptions.Item>
          <Descriptions.Item label="Role" span={12}>
            {accountDetail.roleName}
          </Descriptions.Item>
          <Descriptions.Item label="Name" span={12}>
            {accountDetail.firstName + " " + accountDetail.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={12}>
            {accountDetail.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth" span={12}>
            {accountDetail.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={12}>
            {accountDetail.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone number" span={12}>
            {accountDetail.phone}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={8}>
        <Descriptions>
          <Descriptions.Item label="Clinic's Name" span={8}>
            {accountDetail?.clinic?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Clinic's Tax Code" span={8}>
            {accountDetail?.clinic?.taxCode}
          </Descriptions.Item>
          <Descriptions.Item label="Clinic's Address" span={8}>
            {accountDetail?.clinic?.location?.address}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default ClinicDetailFormComponent; //
