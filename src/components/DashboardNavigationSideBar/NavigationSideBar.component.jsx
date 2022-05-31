import { Menu } from "antd";
import React from "react";

const DashboardSideBarComponent = ({ items }) => {
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
        defaultSelectedKeys={items[0].key}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default DashboardSideBarComponent;
