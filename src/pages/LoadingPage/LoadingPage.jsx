import React from "react";
import { Spin } from "antd";
const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30vh",
      }}
    >
      <Spin size="large" />
      <div style={{ fontSize: "2em" }}>Waiting for confirm booking</div>
    </div>
  );
};

export default LoadingPage;
