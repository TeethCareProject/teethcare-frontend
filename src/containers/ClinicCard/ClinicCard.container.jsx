import React, { useState } from "react";
import { notification } from "antd";
import RoutePath from "../../routers/Path";

import ClinicCardListComponent from "../../components/ClinicCardList/ClinicCardList.component";
import { useHistory, generatePath } from "react-router-dom";
import { useEffect } from "react";
import { getClinics } from "../../services/teeth-apis/ClinicController";

const ClinicCardContainer = ({ clinicData, layoutDirection }) => {
  const history = useHistory();

  const handleClick = (clinicId) => {
    history.push(
      generatePath(RoutePath.CLINIC_DETAIL_PAGE, {
        clinicId,
      })
    );
  };

  const [clinics, setClinics] = useState([]);

  var filterClinicArray = clinicData || clinics;

  const fetchingClinic = async () => {
    try {
      const { data } = await getClinics({
        sortBy: "avgRatingScore",
        sortDir: "desc"
      });

      const mapperClinicData = data?.content?.map((clinic) => ({
        ...clinic,
        onClick: () => handleClick(clinic?.id),
      }));
      setClinics(mapperClinicData);
    } catch (e) {
      notification["error"]({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching clinic, try again later`,
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchingClinic();
  }, []);

  return (
    <>
      {layoutDirection === "row" ? (
        <ClinicCardListComponent layoutDirection="row" listData={clinics} />
      ) : (
        <ClinicCardListComponent
          layoutDirection="column"
          listData={filterClinicArray}
        />
      )}
    </>
  );
};

export default ClinicCardContainer;
