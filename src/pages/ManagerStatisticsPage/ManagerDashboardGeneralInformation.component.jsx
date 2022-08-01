import { Tag } from "antd";
import React from "react";

export const ManagerDashBoardGeneralInformation = ({
  staffNum = "No data",
  dentistNum = "No data",
  CSNum = "No data",
}) => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Tag
        color={"blue"}
        style={{
          padding: "0.8rem 1rem 1.5rem 1rem",
          borderRadius: "10px",
          flex: 1,
        }}
      >
        <p style={{ marginBottom: 10, fontSize: "1.3rem" }}>Number of staffs</p>
        <p style={{ marginBottom: 0, fontSize: "2rem", fontWeight: "600" }}>
          {staffNum}
        </p>
      </Tag>
      <Tag
        color={"green"}
        style={{
          padding: "0.8rem 1rem 1.5rem 1rem",
          borderRadius: "10px",
          flex: 1,
        }}
      >
        <p style={{ marginBottom: 10, fontSize: "1.3rem" }}>
          Number of dentists
        </p>
        <p style={{ marginBottom: 0, fontSize: "2rem", fontWeight: "600" }}>
          {dentistNum}
        </p>
      </Tag>
      <Tag
        color={"magenta"}
        style={{
          padding: "0.8rem 1rem 1.5rem 1rem",
          borderRadius: "10px",
          flex: 1,
        }}
      >
        <p style={{ marginBottom: 10, fontSize: "1.3rem" }}>Number of CS</p>
        <p style={{ marginBottom: 0, fontSize: "2rem", fontWeight: "600" }}>
          {CSNum}
        </p>
      </Tag>
    </div>
  );
};
