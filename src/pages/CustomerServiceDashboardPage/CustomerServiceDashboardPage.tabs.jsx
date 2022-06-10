import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import BookingManagementTableContainer from "../../containers/BookingManagementTable/BookingManagementTable.container";
import FeedbackListContainer from "../../containers/FeedbackList/FeedbackList.container";

function getItem(label, key, icon, onClick) {
  return {
    key,
    icon,
    label,
    onClick,
  };
}

export const navigationList = [
  getItem("Dashboard", "sub1", <MailOutlined />),
  getItem("Booking management", "sub2", <AppstoreOutlined />),
  getItem("My clinic", "sub3", <SettingOutlined />),
  getItem("My clinic Feedback", "sub4", <SettingOutlined />),
];

export const elementList = [
  <div>Dashboard element</div>,
  <BookingManagementTableContainer />,
  <div>My clinic</div>,
  <div style={{ width: "80%" }}>
    <FeedbackListContainer />
  </div>,
];
