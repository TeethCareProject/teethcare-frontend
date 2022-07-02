import { Space, Tag, Button } from "antd";
import voucherStatusConstants from "../../constants/VoucherStatusConstants";

const VoucherManagementTableColumn = [
  {
    title: "Voucher code",
    dataIndex: "voucherCode",
    key: "voucherCode",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (_, record) => <p>{record?.quantity ? record?.quantity : "INF"}</p>,
  },
  {
    title: "Discount value",
    dataIndex: "discountValue",
    key: "discountValue",
  },
  {
    title: "Expired time",
    dataIndex: "expiredTime",
    key: "expiredTime",
    render: (_, record) => (
      <p>{record?.expiredTime ? record?.expiredTime : "N/A"}</p>
    ),
  },
  {
    title: "Create clinic Id",
    dataIndex: "clinicId",
    key: "clinicId",
    render: (_, record) => (
      <p>{record?.clinic?.id ? record?.clinic?.id : "Admin"}</p>
    ),
  },
  {
    title: "Create clinic name",
    dataIndex: "clinicName",
    key: "clinicName",
    render: (_, record) => (
      <p>{record?.clinic?.name ? record?.clinic?.name : "Admin"}</p>
    ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = "green";

      if (status === voucherStatusConstants.UNAVAILABLE) {
        color = "volcano";
      } else if (status === voucherStatusConstants.INACTIVE) {
        color = "magenta";
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
          {record.status == voucherStatusConstants.AVAILABLE ? (
            <Button type="link" onClick={record.onDelete}>
              Delete
            </Button>
          ) : null}
        </Space>
      );
    },
  },
];

export default VoucherManagementTableColumn;
