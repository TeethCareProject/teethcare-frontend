import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import BookingManagementTableContainer from "../../containers/BookingManagementTable/BookingManagementTable.container";
import FeedbackListContainer from "../../containers/FeedbackList/FeedbackList.container";
import ReportManagementTableContainer from "../../containers/ReportManagementTable/ReportManagementTable.container";
import ServiceManagementTableContainer from "../../containers/ServiceManagementTable/ServiceManagementTable.container";

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
  getItem("My clinic Feedback", "sub4", <SettingOutlined />),
  getItem("My clinic Feedback report", "sub6", <SettingOutlined />),
  getItem("My clinic services", "sub5", <SettingOutlined />),
];

export const elementList = [
  <div>Dashboard element</div>,
  <BookingManagementTableContainer />,
  <div style={{ width: "80%" }}>
    <FeedbackListContainer />
  </div>,
  <ReportManagementTableContainer />,
  <ServiceManagementTableContainer />,
];
