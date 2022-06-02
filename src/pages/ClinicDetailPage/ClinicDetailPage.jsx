import React from "react";
import { useParams } from "react-router";

import ClinicDetailContainer from "../../containers/ClinicDetailContainer/ClinicDetailContainer.container";

const ClinicDetailPage = () => {
  const { clinicId } = useParams();
  return (
    <div>
      <div>
        <ClinicDetailContainer clinicId={clinicId} />
      </div>
    </div>
  );
};

export default ClinicDetailPage;
