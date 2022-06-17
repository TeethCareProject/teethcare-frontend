import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import DentistDashBoardContainer from "../../containers/DentistDashboard/DentistDashBoard.container";
import BookingManagementTableContainer from "../../containers/BookingManagementTable/BookingManagementTable.container";

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
  <div>
    <DentistDashBoardContainer />
  </div>,
  <div>
    <BookingManagementTableContainer />
  </div>,
  <div>My clinic</div>,
];
