import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { Form, Input, Button, Select, Row, Col, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLocationApi } from "../../../services/teeth-apis/LocationController";
import setProvincesHandler from "../../../redux/location/location.action";
import { useHistory } from "react-router-dom";

const ClinicContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const provinces = useSelector((state) => state.provinces.provinces);

  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();

  useLayoutEffect(() => {
    const getClinic = async () => {
      try {
        const provinceArray = await getLocationApi();
        dispatch(setProvincesHandler(provinceArray.data));
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
    <div>
      <div>ClinicContainer</div>
    </div>
  );
};

export default ClinicContainer;
