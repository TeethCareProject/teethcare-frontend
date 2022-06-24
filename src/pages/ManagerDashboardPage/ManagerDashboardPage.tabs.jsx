import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import ClinicProfileFormContainer from "../../containers/ClinicProfile/ClinicProfileForm.container";
import StaffManagementTableContainer from "../../containers/StaffManagementTable/StaffManagementTable.container";

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
  getItem("Staff management", "sub2", <AppstoreOutlined />),
  getItem("Report request", "sub3", <SettingOutlined />),
  getItem("My clinic", "sub4", <SettingOutlined />),
];

export const elementList = [
  <div>Dashboard element</div>,
  <StaffManagementTableContainer />,
  <div>Report request</div>,
  <ClinicProfileFormContainer />,
];
