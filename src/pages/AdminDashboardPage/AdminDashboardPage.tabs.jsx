import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import AccountManagementTableContainer from "../../containers/AccountManagementTable/AccountManagementTable.container";
import ReportManagementTableContainer from "../../containers/ReportManagementTable/ReportManagementTable.container";
import PendingAccountManagementTableContainer from "../../containers/PendingAccountManagementTable/PendingAccountManagementTable.container";

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

export const elementList = [
  <div>Dashboard element</div>,
  <AccountManagementTableContainer />,
  <ReportManagementTableContainer />,
  <PendingAccountManagementTableContainer />,
];
