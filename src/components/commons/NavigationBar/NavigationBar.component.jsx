import React from "react";
import { Space, Avatar, Typography } from "antd";
import RoutePath from "../../../routers/Path";
import NotificationContainer from "../../../containers/Notification/Notification.container";
import { UserOutlined } from "@ant-design/icons";
import "./NavigationBar.style.scss";

const NavigationBarComponent = ({
  isAuthUser,
  onClick,
  history,
  userName,
  location,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 3rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="navigation"
    >
      <Space>
        {isAuthUser ? (
          <div
            className="navigation-bar"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {location === RoutePath.HOME_PAGE ? (
              <div className="nav-element active" onClick={(e) => onClick(e)}>
                Home
              </div>
            ) : (
              <div className="nav-element" onClick={(e) => onClick(e)}>
                Home
              </div>
            )}
            {location === RoutePath.DASHBOARD_PAGE ? (
              <div className="nav-element active" onClick={(e) => onClick(e)}>
                Dashboard
              </div>
            ) : (
              <div className="nav-element" onClick={(e) => onClick(e)}>
                Dashboard
              </div>
            )}

            <div className="nav-element" onClick={(e) => onClick(e)}>
              Logout
            </div>
          </div>
        ) : (
          <div
            className="navigation-bar"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="nav-element" onClick={(e) => onClick(e)}>
              Home
            </div>
            <div className="nav-element" onClick={(e) => onClick(e)}>
              Login
            </div>
          </div>
        )}
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
