import { provinceActions } from "./location.slice";

const setProvincesHandler = (locationData) => {
  return (dispatch) => {
    localStorage.setItem("provinces", JSON.stringify(locationData));
    dispatch(provinceActions.setProvinces(locationData));
  };
};

export default setProvincesHandler;
