import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

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
];

export const elementList = [
  <div>Dashboard element</div>,
  <div>Booking managemnt</div>,
  <div>My clinic</div>,
];
