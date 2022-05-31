import React from "react";

const TableDetailModal = () => {
  return (
    <div>
      <Modal
        destroyOnClose
        visible={accountId !== null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={8}>
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
          <Col span={16}>
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
              <Descriptions.Item label="Status" span={12}>
                {accountDetail.status}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TableDetailModal;
