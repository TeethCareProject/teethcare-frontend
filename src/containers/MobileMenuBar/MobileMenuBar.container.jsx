import React from "react";
import { Menu, Dropdown } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuOutlined,
  AppstoreOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../redux/authentication/authentication.action";

const MobileMenuBar = ({ title }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthUser = useSelector((state) => state.authentication.isAuthUser);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>Profile</span>,
          icon: <UserOutlined />,
          onClick: () => history.push(RoutePath.PROFILE_PAGE),
        },
        {
          key: "2",
          label: <span>Homepage</span>,
          icon: <HomeOutlined />,
          onClick: () => history.push(RoutePath.HOME_PAGE),
        },
        {
          key: "3",
          label: <span>Dashboard</span>,
          icon: <AppstoreOutlined />,
          onClick: () => history.push(RoutePath.DASHBOARD_PAGE),
        },
        {
          key: "4",
          label: <span>{isAuthUser ? "Log out" : "Log in"}</span>,
          icon: (
            <span>{isAuthUser ? <LogoutOutlined /> : <LoginOutlined />}</span>
          ),
          onClick: () => {
            if (isAuthUser) {
              dispatch(logoutHandler());
              history.push(RoutePath.HOME_PAGE);
            } else {
              history.push(RoutePath.LOGIN_PAGE);
            }
          },
        },
      ]}
    />
  );

  return (
    <>
      <div
        className="menu-title"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{ position: "absolute", left: 10, cursor: "pointer" }}
          className="mobile-feature"
        >
          <Dropdown overlay={menu} placement="bottomLeft">
            <MenuOutlined />
          </Dropdown>
        </div>
        <div
          style={{ position: "absolute", right: 10, cursor: "pointer" }}
          className="mobile-feature"
        >
          <BellOutlined />
        </div>
        <div className="title-mobile">{title}</div>
      </div>
    </>
  );
};

export default MobileMenuBar;
