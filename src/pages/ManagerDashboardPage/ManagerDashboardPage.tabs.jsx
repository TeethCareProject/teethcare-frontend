import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import ClinicProfileFormContainer from "../../containers/ClinicProfile/ClinicProfileForm.container";
import StaffManagementTableContainer from "../../containers/StaffManagementTable/StaffManagementTable.container";
import VoucherManagementTableContainer from "../../containers/VoucherManagementTable/VoucherManagementTable.container";
import ManagerStatisticsPage from "../ManagerStatisticsPage/ManagerStatisticsPage";

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
  getItem("Voucher management", "sub5", <SettingOutlined />),
];

export const elementList = [
  <ManagerStatisticsPage />,
  <StaffManagementTableContainer />,
  <div>Report request</div>,
  <ClinicProfileFormContainer />,
  <VoucherManagementTableContainer />,
];
