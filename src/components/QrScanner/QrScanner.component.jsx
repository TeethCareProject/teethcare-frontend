import { Space, Typography } from "antd";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrScannerComponent = ({ handleResult }) => {
  const [qrscan, setQrscan] = useState("No result");

  return (
    <>
      <div>
        <QrReader
          delay={300}
          constraints={{
            facingMode: "enviroment",
          }}
          onResult={(result, error) => {
            if (!!result) {
              setQrscan(result?.text);
              handleResult(result?.text);
            }
          }}
        />
        <Space>
          <Typography>{qrscan}</Typography>
        </Space>
      </div>
    </>
  );
};

export default QrScannerComponent;
