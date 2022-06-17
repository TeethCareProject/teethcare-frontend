import { Space, Tag, Button } from "antd";
import BookingStatusConstants from "../../constants/BookingStatusConstants";

const BookingManagementTableColumn = [
  {
    title: "Booking ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Patient name",
    key: "patientName",
    render: (_, record) => (
      <p>{record?.patient?.firstName + " " + record?.patient?.lastName}</p>
    ),
  },
  {
    title: "Patient phone number",
    key: "patientPhoneNumber",
    render: (_, record) => <p>{record?.patient?.phone}</p>,
  },
  {
    title: "Booking time",
    key: "createBookingDate",
    render: (_, record) => (
      <p>{new Date(record?.createBookingDate).toISOString()}</p>
    ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = "green";

      if (status === BookingStatusConstants.TREATMENT) {
        color = "blue";
      } else if (status === BookingStatusConstants.PENDING) {
        color = "cyan";
      } else if (status === BookingStatusConstants.REJECTED) {
        color = "red";
      } else if (status === BookingStatusConstants.REQUEST) {
        color = "purple";
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

export default BookingManagementTableColumn;
