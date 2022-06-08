import React, { useState } from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutHandler } from "../../../redux/authentication/authentication.action";
import RoutePath from "../../../routers/Path";

const items = [
  {
    label: "Home",
    key: "home",
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

const NavigationBar = () => {
  const [current, setCurrent] = useState("mail");
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthUser = useSelector((state) => state.authentication.isAuthUser);

  const onClick = (e) => {
    if (e.key === "logout") {
      //call logout
      dispatch(logoutHandler());
      history.push(RoutePath.HOME_PAGE);
    } else if (e.key === "login") {
      history.push(RoutePath.LOGIN_PAGE);
      setCurrent(e.key);
    } else if (e.key === "home") {
      history.push(RoutePath.HOME_PAGE);
      setCurrent(e.key);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={isAuthUser ? items : defaultItems}
    />
  );
};

export default NavigationBar;
