import { Menu } from "antd";
import React from "react";

const DashboardSideBarComponent = ({ items, selectedKey, mode }) => {
  const onClick = (e) => {
    //handle onclick item
    items.find((item) => item.key === e.key)?.onClick();
  };

  return (
    <Menu
      onClick={onClick}
      // style={{
      //   textOverflow: "ellipsis",
      // }}
      selectedKeys={selectedKey}
      mode={mode}
      items={items}
    />
  );
};

export default DashboardSideBarComponent;
