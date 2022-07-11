import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import RoutePath from "../../../routers/Path";

const BookingFailedPage = () => {
  const history = useHistory();

  return (
    <div
      style={{
        height: "70vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status="error"
        title="Failed to book this service"
        subTitle="There are some problems while booking! We're sorry for this trouble, please try again later!"
        extra={[
          <Button
            type="primary"
            key="homepage"
            onClick={() => history.push(RoutePath.HOME_PAGE)}
          >
            Go to Homepage
          </Button>,
        ]}
      ></Result>
    </div>
  );
};

export default BookingFailedPage;
