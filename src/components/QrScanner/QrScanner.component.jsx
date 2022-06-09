import { Space, Typography } from "antd";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrScannerComponent = ({ handleResult }) => {
  const [qrscan, setQrscan] = useState("No result");

  return (
    <>
      <div style={{ marginTop: 30, height: 300 }}>
        <QrReader
          delay={300}
          onResult={(result, error) => {
            if (!!result) {
              setQrscan(result?.text);
              handleResult(result?.text);
            }
          }}
          style={{ height: 240, width: 320 }}
        />

        <Space>
          <Typography>{qrscan}</Typography>
        </Space>
        <div
          style={{
            height: "200px",
            width: "200px",
            border: "2px solid red",
            position: "relative",
            top: "-93%",
            right: "-18%",
          }}
        ></div>
      </div>
    </>
  );
};

export default QrScannerComponent;
