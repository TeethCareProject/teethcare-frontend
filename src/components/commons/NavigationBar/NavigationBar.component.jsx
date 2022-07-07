import React from "react";
import { Menu, Space, Avatar, Typography } from "antd";
import RoutePath from "../../../routers/Path";
import NotificationContainer from "../../../containers/Notification/Notification.container";
import {
  MailOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./NavigationBar.style.scss";

const items = [
  {
    label: "Home",
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <MailOutlined />,
  },
  {
    label: "Logout",
    key: "logout",
    icon: <AppstoreOutlined />,
  },
];

const defaultItems = [
  {
    label: "Home",
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: "Login",
    key: "login",
    icon: <AppstoreOutlined />,
  },
];

const NavigationBarComponent = ({
  isAuthUser,
  onClick,
  history,
  userName,
  current,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 3rem",
      }}
      className="navigation"
    >
      <Space>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={isAuthUser ? items : defaultItems}
        />
      </Space>
      {isAuthUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div style={{ marginRight: "3rem" }}>
            <NotificationContainer />
          </div>
          <Space>
            <Avatar
              style={{ backgroundColor: "#87d068", cursor: "pointer" }}
              size={48}
              icon={<UserOutlined />}
              onClick={() => history.push(RoutePath.PROFILE_PAGE)}
            />
            <Typography>{userName}</Typography>
          </Space>
        </div>
      ) : null}
    </div>
  );
};

export default NavigationBarComponent;
