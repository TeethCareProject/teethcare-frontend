import React from "react";
import { Button, Typography, Row, Col, Card } from "antd";
import { convertMillisecondsToDate } from "../../utils/convert.utils";

const BookingCardComponent = ({ booking }) => {
  const { Meta } = Card;
  return (
    <div>
      {booking ? (
        <div>
          <div
            style={{
              display: "flex",
              width: "55vw",
              alignItems: "center",
              border: "1px solid #d6cbcb",
              borderRadius: "10px",
              marginBottom: "60px",
            }}
          >
            <div>
              <img
                style={{ height: "300px" }}
                src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
                alt="clinic"
              />
            </div>
            <div
              style={{ lineHeight: "3em", marginLeft: "20px", width: "50%" }}
            >
              <div style={{ fontSize: "1.5em" }}>
                <span style={{ fontWeight: "bold" }}>Services: </span>
                {booking[0]?.services.map((service, index) => (
                  <span>{service.name + `${" "}`}</span>
                ))}
              </div>
              <div style={{ fontSize: "1.5em" }}>
                <span style={{ fontWeight: "bold" }}>Patient: </span>
                <span>
                  {booking[0]?.patient?.firstName +
                    " " +
                    booking[0]?.patient?.lastName}
                </span>
              </div>
              <div style={{ fontSize: "1.5em" }}>
                <span style={{ fontWeight: "bold" }}>Patient: </span>
                {convertMillisecondsToDate(booking[0]?.examinationTime)}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                }}
                className="card-clinic-clinic-page-button"
              >
                <Button
                  shape="round"
                  size="large"
                  style={{
                    backgroundColor: "#00B507",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  // onClick={booking[1].onClick}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Typography.Title level={4}>Next examination</Typography.Title>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              {booking
                ?.filter((bookingElement, index) => index > 1 && index < 5)
                .map((bookingElement) => (
                  <Col span={2}>
                    <Card
                      style={{ width: 250 }}
                      cover={
                        <img
                          style={{ height: 250 }}
                          alt="example"
                          src="http://australiandentalclinic.vn/wp-content/uploads/2017/02/teeth-whitening-sample1.jpg"
                        />
                      }
                    >
                      <Meta
                        title={
                          bookingElement?.patient?.firstName +
                          " " +
                          bookingElement?.patient?.lastName
                        }
                        description={convertMillisecondsToDate(
                          bookingElement?.examinationTime
                        )}
                      />
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookingCardComponent;
