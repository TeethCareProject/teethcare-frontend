import { Table, Typography } from "antd";
import React from "react";

const CommonTableComponent = ({ tableTitle, ...antdTableProps }) => {
  return (
    <div>
      <Typography.Title level={3}>{tableTitle}</Typography.Title>
      <Table {...antdTableProps} />
    </div>
  );
};

export default CommonTableComponent;
