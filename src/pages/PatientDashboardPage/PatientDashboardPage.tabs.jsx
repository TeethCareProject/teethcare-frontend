import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import BookingListContainer from "../../containers/BookingList/BookingList.container";
import AppointmentListContainer from "../../containers/AppointmentList/AppointmentList.container";

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
  getItem("My booking", "sub2", <AppstoreOutlined />),
  getItem("My appointment", "sub3", <SettingOutlined />),
];

export const elementList = [
  <div>Dashboard element</div>,
  <div style={{ width: "80%" }}>
    <BookingListContainer />
  </div>,
  <div>
    <AppointmentListContainer />
  </div>,
];
