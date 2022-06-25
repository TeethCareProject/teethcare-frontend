import React from "react";
import { Button, Result, Descriptions } from "antd";
const ConfirmBookingComponent = ({
  bookingData,
  rejectUpdate,
  confirmUpdate,
}) => {
  return (
    <Result
      title={
        <div>
          <div>Do you want to confirm this booking?</div>
          <div>
            <div>
              Name:{" "}
              {bookingData?.patient?.firstName +
                " " +
                bookingData?.patient?.lastName}
            </div>
            <div>Phone number: {bookingData?.patient?.phone}</div>
            <div style={{ marginTop: 20, fontWeight: "bold" }}>Services:</div>
            {bookingData?.services
              ? bookingData?.services.map((service) => (
                  <div>
                    <div>{`${service.name + ": " + service.price}`}</div>
                  </div>
                ))
              : null}
            <div>
              Total Price: {`${" "}`} {bookingData?.totalPrice}
            </div>
          </div>
        </div>
      }
      extra={
        <div>
          <Button
            type="danger"
            style={{ marginRight: 30, width: 80 }}
            onClick={() => rejectUpdate()}
          >
            Reject
          </Button>
          <Button
            type="primary"
            key="console"
            style={{ width: 80 }}
            onClick={() => confirmUpdate()}
          >
            Confirm
          </Button>
        </div>
      }
    />
  );
};

export default ConfirmBookingComponent;
