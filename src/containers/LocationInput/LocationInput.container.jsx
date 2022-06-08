import React, { useState } from "react";
import { notification } from "antd";
import { useLayoutEffect } from "react";
import { getLocation } from "../../services/teeth-apis/LocationController";
import LocationInputComponent from "../../components/customized-components/LocationInput/LocationInput.component";

const LocationInputContainer = () => {
  // const provinces = useSelector((state) => state.provinces.provinces);
  const [provinces, setProvinces] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();

  useLayoutEffect(() => {
    const fetchingLocationData = async () => {
      try {
        const { data } = await getLocation();
        setProvinces(data);
      } catch (e) {
        notification["error"]({
          message: `Something went wrong! Try again latter!`,
          description: `There is problem while fetching data, try again later`,
          duration: 2,
        });
      }
    };
    fetchingLocationData();
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
    <>
      <LocationInputComponent
        name="provinceId"
        label="Province"
        placeholder="Select province"
        arrayOption={provinces}
        selectedValue={selectedProvince}
        handleValueChange={handleProvinceChange}
      />
      <LocationInputComponent
        name="districtId"
        label="District"
        placeholder="Select district"
        selectedValue={selectedDistrict}
        handleValueChange={handleDistrictChange}
        arrayOption={availableDistrict}
      />
      <LocationInputComponent
        name="wardId"
        label="Ward"
        placeholder="Select district"
        selectedValue={selectedWard}
        handleValueChange={handleWardChange}
        arrayOption={availableWard}
      />
    </>
  );
};

export default LocationInputContainer;
