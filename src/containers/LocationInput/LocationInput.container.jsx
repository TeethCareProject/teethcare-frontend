import React, { useState } from "react";
import { Cascader, Form, notification } from "antd";
import { useLayoutEffect } from "react";
import { getLocation } from "../../services/teeth-apis/LocationController";
import LocationInputComponent from "../../components/customized-components/LocationInput/LocationInput.component";
import LocationMapper from "../../mapper/LocationMapper";

const LocationInputContainer = ({ defaultValues }) => {
  // const provinces = useSelector((state) => state.provinces.provinces);
  const [locationData, setLocationData] = useState([]);
  const [data, setData] = useState([]); //for prevent display number at the first time

  useLayoutEffect(() => {
    const fetchingLocationData = async () => {
      try {
        const { data } = await getLocation();
        const mapperData = LocationMapper(data);
        setLocationData(mapperData);
        setData(defaultValues);
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

  return (
    <>
      <Form.Item name="location" label="Location" required>
        <Cascader options={locationData} defaultValues={data} />
      </Form.Item>
    </>
  );
};

export default LocationInputContainer;
