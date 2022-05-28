import React, { Fragment } from "react";
import { Col, Row, Button, notification, Card } from "antd";
import { StarFilled } from "@ant-design/icons";

import clinicImg from "../../assets/clinicImg.png";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClinicsAPI } from "../../services/teeth-apis/ClinicController";
import setClinicStorageHandler from "../../redux/clinic/clinic.action";

import "./CardClinicContainer.style.css";

const CardClinicContainer = ({ layoutDirection }) => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const clinics = useSelector((state) => state.clinics.clinics);
  console.log(clinics);
  useEffect(() => {
    const getClinic = async () => {
      try {
        const clinicsArray = await getClinicsAPI();
        dispatch(setClinicStorageHandler(clinicsArray.data));
      } catch (e) {
        notification["error"]({
          message: `Something went wrong! Try again latter!`,
          description: `There is problem while fetching clinic, try again later`,
          duration: 2,
        });
      }
    };
    getClinic();
  }, []);

  return (
    <Fragment>
      {layoutDirection === "row" ? (
        <Row justify="space-between">
          {clinics
            .filter((clinic) => clinic.id <= 4)
            .map((clinic) => (
              <Col span={6}>
                <Card
                  className="clinic-card-homepage"
                  hoverable
                  //   style={{ height: 300 }}
                  cover={
                    <img
                      alt="example"
                      src={clinicImg}
                      style={{ height: 400 }}
                    />
                  }
                >
                  <Meta
                    title={`${clinic?.name} - ${clinic.location?.ward?.district?.name}`}
                    description={
                      <div className="card-home-page-rating">
                        <div> {clinic.avgRatingScore}</div>
                        <StarFilled style={{ color: "#FFCB45" }} />
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
        </Row>
      ) : (
        <div>
          {clinics.map((clinic) => (
            <Row>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={clinicImg} />}
              >
                <Meta
                  title={`${clinic?.name} - ${clinic.location?.ward?.district?.name}`}
                  description={
                    <div className="card-home-page-rating">
                      <div>{clinic.avgRatingScore}</div>
                      <StarFilled style={{ color: "#FFCB45" }} />
                    </div>
                  }
                />
              </Card>
            </Row>
          ))}
        </div>
      )}
      ;
    </Fragment>
  );
};

export default CardClinicContainer;
