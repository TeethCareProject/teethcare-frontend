import { Space, Button } from "antd";

const ServicePickingModalColumn = [
  {
    title: "Service ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return (
        <Space size="middle">
          <Button
            disabled={record.service?.selected ? true : false}
            type="link"
            onClick={() => record.chooseServiceHandler()}
          >
            Select
          </Button>
        </Space>
      );
    },
  },
];

export default ServicePickingModalColumn;
