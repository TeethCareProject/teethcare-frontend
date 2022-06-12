import { Space, Tag, Button } from "antd";
import { ServiceStatusConstants } from "../../constants/ServiceStatusConstants";

const ServiceManagementTableColumn = [
  {
    title: "Service ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Service name",
    dataIndex: "name",
    key: "name",
    render: (_, record) => <p>{record.name}</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (_, record) => (
      <p>{record?.description?.length > 20 ? record?.description : "N/A"}</p>
    ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = "green";

      if (status === ServiceStatusConstants.INACTIVE) {
        color = "volcano";
      } else if (status === ServiceStatusConstants.PENDING) {
        color = "geekblue";
      }

      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return (
        <Space size="middle">
          <Button type="link" onClick={record.getDetail}>
            Update
          </Button>
          <Button type="link" onClick={record.onDelete}>
            Delete
          </Button>
        </Space>
      );
    },
  },
];

export default ServiceManagementTableColumn;
