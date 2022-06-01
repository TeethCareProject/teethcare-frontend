import React, { Fragment, useState } from "react";
import { Col, Row, notification, Card } from "antd";
import { StarFilled } from "@ant-design/icons";

import clinicImg from "../../assets/clinicImg.png";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getClinicsAPI } from "../../services/teeth-apis/ClinicController";

import ClinicCardComponent from "../../components/customized-components/ClinicCard/ClinicCard.component";
import "./ClinicCardContainer.style.scss";

const ClinicCardContainer = ({ clinicData, layoutDirection }) => {
  const history = useHistory();
  const onClick = (idClinic) => {
    history.push("/clinics/" + idClinic);
  };

  const { Meta } = Card;
  const [clinics, setClinics] = useState([]);

  var filterClinicArray = clinicData || clinics;

  useEffect(() => {
    const getClinic = async () => {
      try {
        const { data } = await getClinicsAPI();
        setClinics(data.content);
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
            ?.filter((clinic) => clinic.id <= 4)
            .map((clinic, index) => (
              <Col key={index} span={6}>
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
                    className="card-clinic-content"
                    description={
                      <div>
                        <div className="card-clinic-description">
                          {clinic?.name} - {clinic.location?.address}
                        </div>
                        <div className="card-home-page-rating">
                          <div style={{ color: "#FFCB45" }}>
                            {`${clinic.avgRatingScore} `}
                          </div>
                          <StarFilled style={{ color: "#FFCB45" }} />
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
        </Row>
      ) : (
        <div className="card-clinic-preview">
          {filterClinicArray?.map((clinic, index) => (
            <div key={index}>
              <ClinicCardComponent
                id={clinic.id}
                imgSrc={clinicImg}
                name={clinic.name}
                serviceArray={clinic.serviceOfClinicResponses}
                district={clinic.location.ward.district.name}
                province={clinic.location.ward.district.province.name}
                avgRatingScore={clinic.avgRatingScore}
                onClick={onClick}
              />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ClinicCardContainer;
