import React from "react";
import { Button, Space, Typography, Tooltip } from "antd";
import { generatePath } from "react-router-dom";
import RoutePath from "../../routers/Path";
import { convertMomentToMilliseconds } from "../../utils/convert.utils";
import moment from "moment";
import BookingStatusConstants from "../../constants/BookingStatusConstants";
import QRCode from "react-qr-code";

const PatientActionButtonGroupComponent = ({
  bookingId,
  bookingData,
  disabled,
  handleAssign,
  handleGiveFeedback,
}) => {
  return (
    <>
      <div style={{ background: "white", padding: "16px" }}>
        <QRCode
          value={`${window.location.origin}${generatePath(
            RoutePath.TRIGGER_QR_CODE_NOTIFICATION_PAGE,
            { bookingId: bookingId }
          )}`}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <Typography>Give your feedback for this clinic!!</Typography>
          <Button
            type="primary"
            onClick={() => {
              handleGiveFeedback(bookingId);
            }}
          >
            Give feedback
          </Button>
        </Space>
        {bookingData &&
        convertMomentToMilliseconds(moment()) - bookingData?.createBookingTime <
          120 * 1000 &&
        (bookingData.status === BookingStatusConstants.PENDING ||
          bookingData.status === BookingStatusConstants.REQUEST) ? (
          <Tooltip title="You can not cancel booking after 120s since created ">
            <Button
              style={{ marginLeft: 100 }}
              type="danger"
              disabled={disabled}
              onClick={() =>
                handleAssign({
                  isAccepted: false,
                })
              }
            >
              Cancel this booking
            </Button>
          </Tooltip>
        ) : null}
      </div>
    </>
  );
};

export default PatientActionButtonGroupComponent;
