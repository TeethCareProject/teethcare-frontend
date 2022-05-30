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
  getItem("User management", "sub2", <AppstoreOutlined />),
  getItem("Feedback reports", "sub3", <SettingOutlined />),
  getItem("Account request", "sub4", <SettingOutlined />),
];
