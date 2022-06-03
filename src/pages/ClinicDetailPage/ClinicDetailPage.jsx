import React from "react";
import { useParams } from "react-router";

import ClinicDetailContainer from "../../containers/ClinicDetail/ClinicDetail.container";

const ClinicDetailPage = () => {
  const { id } = useParams();
  return (
    <div>
      <div>
        <ClinicDetailContainer clinicId={id} />
      </div>
    </div>
  );
};

export default ClinicDetailPage;
