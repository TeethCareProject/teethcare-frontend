import { Menu } from "antd";
import React from "react";

const DashboardSideBarComponent = ({ items, selectedKey }) => {
  const onClick = (e) => {
    //handle onclick item
    items.find((item) => item.key === e.key)?.onClick();
  };

  return (
    <div>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        selectedKeys={selectedKey}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default DashboardSideBarComponent;
