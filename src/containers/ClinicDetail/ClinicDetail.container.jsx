import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { generatePath } from "react-router";
import { notification } from "antd";
import ClinicDetailComponent from "../../components/customized-components/ClinicDetail/ClinicDetail.component";
import { getClinicById } from "../../services/teeth-apis/ClinicController";
import { getClinicFeedBack } from "../../services/teeth-apis/FeedbackController";
import RoutePath from "../../routers/Path";

const ClinicDetailContainer = () => {
  const { clinicId } = useParams();
  const history = useHistory();
  const [currentClinic, setCurrentClinic] = useState({});
  const [feedback, setFeedback] = useState([]);

  const fetchingClinic = async () => {
    const { data } = await getClinicById(clinicId);
    const mapperClinicData = data?.serviceOfClinicResponses?.map((service) => ({
      ...service,
      onClick: () => handleServiceClick(data.id, service.id),
    }));

    data["serviceOfClinicResponses"] = mapperClinicData;
    setCurrentClinic(data);
  };

  const fetchingClinicFeedback = async () => {
    const { data } = await getClinicFeedBack({ clinicId });
    setFeedback(data);
  };

  useEffect(() => {
    Promise.all([fetchingClinic(), fetchingClinicFeedback()]).catch(function (
      err
    ) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2,
      });
    });
  }, []);

  const handleServiceClick = (clinicId, serviceId) =>
    history.push(
      generatePath(RoutePath.SERVICE_DETAIL_PAGE, {
        clinicId,
        serviceId,
      })
    );

  return (
    <div className="clinic-detail-page-container" style={{ margin: 60 }}>
      <ClinicDetailComponent clinicData={currentClinic} feedback={feedback} />
    </div>
  );
};

export default ClinicDetailContainer;
