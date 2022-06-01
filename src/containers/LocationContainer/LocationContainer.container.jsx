import React, { useState } from "react";
import { notification } from "antd";
import { useLayoutEffect } from "react";
import { getLocationApi } from "../../services/teeth-apis/LocationController";
import LocationSelectBlock from "../../components/customized-components/LocationSelectBlock/LocationSelectBlock.component";

const LocationContainer = () => {
  // const provinces = useSelector((state) => state.provinces.provinces);
  const [provinces, setProvinces] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();

  useLayoutEffect(() => {
    const getClinic = async () => {
      try {
        const { data } = await getLocationApi();
        setProvinces(data);
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
  const availableDistrict = provinces?.find(
    (c) => c.id === selectedProvince
  )?.districtList;
  const availableWard = availableDistrict?.find(
    (s) => s.id === selectedDistrict
  )?.wardList;

  const handleProvinceChange = (e) => {
    setSelectedProvince(e);
  };
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e);
  };
  const handleWardChange = (e) => {
    setSelectedWard(e);
  };

  return (
    <LocationSelectBlock
      provinces={provinces}
      selectedProvince={selectedProvince}
      selectedDistrict={selectedDistrict}
      selectedWard={selectedWard}
      handleProvinceChange={handleProvinceChange}
      handleDistrictChange={handleDistrictChange}
      handleWardChange={handleWardChange}
      availableDistrict={availableDistrict}
      availableWard={availableWard}
    />
  );
};

export default LocationContainer;
