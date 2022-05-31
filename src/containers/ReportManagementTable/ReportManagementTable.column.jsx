import { Space, Tag, Button } from "antd";

const AccountManagementTableColumn = [
  {
    title: "Report ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Feedback detail",
    dataIndex: "feedbackDetail",
    key: "feedbackDetail",
    render: (_, record) => <p>{record?.feedbackResponse?.detail}</p>,
  },
  {
    title: "Report detail",
    dataIndex: "detail",
    key: "detail",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = "green";

      //TODO:check this again with backend for real status
      if (status === "INACTIVE") {
        color = "volcano";
      } else if (status === "PENDING") {
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
            Detail
          </Button>
        </Space>
      );
    },
  },
];

export default AccountManagementTableColumn;
