import { Space, Tag, Button } from "antd";
import AccountStatusConstants from "../../constants/AccountStatusConstants";

const StaffManagementTableColumn = [
  {
    title: "User ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Full name",
    dataIndex: "fullName",
    key: "fullName",
    render: (_, record) => <p>{record.firstName + " " + record.lastName}</p>,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Role",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = "green";

      if (status === AccountStatusConstants.INACTIVE) {
        color = "volcano";
      } else if (status === AccountStatusConstants.PENDING) {
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

export default StaffManagementTableColumn;
