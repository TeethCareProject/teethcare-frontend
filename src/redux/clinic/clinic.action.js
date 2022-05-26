import { clinicActions } from "./clinic.slice";

const setClinicStorageHandler = (clinicData) => {
  return (dispatch) => {
    localStorage.setItem("clinics", JSON.stringify(clinicData));
    dispatch(clinicActions.setClinics(clinicData));
  };
};

export default setClinicStorageHandler;
