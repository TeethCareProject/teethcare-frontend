import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import AssignedBookingListContainer from "../../containers/AssignedBookingList/AssignedBookingList.container";

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
  getItem("Assigned booking", "sub2", <AppstoreOutlined />),
  getItem("My clinic", "sub3", <SettingOutlined />),
];

export const elementList = [
  <div>Dashboard element</div>,
  <div>
    <AssignedBookingListContainer />
  </div>,
  <div>My clinic</div>,
];
