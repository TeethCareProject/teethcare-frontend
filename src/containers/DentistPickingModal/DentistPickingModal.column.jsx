import { Space, Tag } from "antd";
import { AccountStatusConstants } from "../../constants/AccountStatusConstants";

const DentistPickingModalColumn = [
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
    title: "Specialization",
    dataIndex: "specialization",
    key: "specialization",
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
          <div onClick={(e) => record.chooseDentistHandler(e)}>Choose</div>
        </Space>
      );
    },
  },
];

export default DentistPickingModalColumn;
