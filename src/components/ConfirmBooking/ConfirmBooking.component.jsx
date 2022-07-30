import React from "react";
import { Button, Col, Row, Typography, Divider } from "antd";
const ConfirmBookingComponent = ({
  bookingData,
  rejectUpdate,
  confirmUpdate,
}) => {
  return (
    <>
      <Row
        style={{
          width: "80vw",
          marginLeft: "10vw",
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        <Col span={12}>
          <Typography.Title level={3}>Booking Confirmation</Typography.Title>
        </Col>
        <Col span={12}>
          <Typography.Title level={3}>
            Order Total: {bookingData?.finalPrice + " VND"}
          </Typography.Title>
        </Col>
      </Row>
      <Row style={{ background: "#dbf3fa" }}>
        <Row
          style={{
            width: "80%",
            marginLeft: "10vw",
            paddingTop: 50,
            paddingBottom: 50,
          }}
        >
          <Col span={12} style={{ color: "#1890FF" }}>
            <Typography.Title
              style={{ color: "#1890FF", marginTop: 10 }}
              level={4}
            >
              Your Information
            </Typography.Title>
            <Divider style={{ width: "80%", minWidth: "80%" }} />
            <Row>
              {bookingData?.patient?.firstName +
                " " +
                bookingData?.patient?.lastName}
            </Row>
            <Row>{bookingData?.patient?.gender}</Row>
            <Row>{bookingData?.patient?.phone}</Row>
            <Row>{bookingData?.patient?.email}</Row>
          </Col>
          <Col span={12} style={{ color: "#1890FF" }}>
            <Typography.Title
              style={{ color: "#1890FF", marginTop: 10 }}
              level={4}
            >
              Service Information
            </Typography.Title>
            <Divider
              style={{ width: "100%", minWidth: "80%", color: "black" }}
            />
            {bookingData?.services
              ? bookingData?.services?.map((service, index) => (
                  <Row>
                    {index +
                      1 +
                      ". " +
                      service.name +
                      " - " +
                      service.price +
                      "VND"}
                  </Row>
                ))
              : null}
          </Col>
        </Row>
        <Row
          style={{
            width: "80%",
            marginLeft: "10vw",
            paddingTop: 50,
            paddingBottom: 50,
          }}
        >
          <Col span={12} style={{ color: "#1890FF" }}>
            <Typography.Title
              style={{ color: "#1890FF", marginTop: 10 }}
              level={4}
            >
              Clinic Information
            </Typography.Title>
            <Divider style={{ width: "80%", minWidth: "80%" }} />
            <Row>{bookingData?.clinic?.name}</Row>
          </Col>
          <Col span={12} style={{ color: "#1890FF" }}>
            <Typography.Title
              style={{ color: "#1890FF", marginTop: 10 }}
              level={4}
            >
              Voucher Information
            </Typography.Title>
            <Divider
              style={{ width: "100%", minWidth: "80%", color: "black" }}
            />
            {bookingData?.voucher ? (
              <span>
                {bookingData?.voucher.voucherCode +
                  " (Discount: " +
                  bookingData?.voucher.discountValue +
                  " VND)"}
              </span>
            ) : (
              "N/A"
            )}
          </Col>
        </Row>
      </Row>
      <Row justify="center" style={{ marginTop: 20 }}>
        <Button
          type="danger"
          style={{ marginRight: 20 }}
          onClick={() => rejectUpdate()}
        >
          Reject
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 20 }}
          onClick={() => confirmUpdate()}
        >
          Confirm
        </Button>
      </Row>
    </>
  );
};

export default ConfirmBookingComponent;
