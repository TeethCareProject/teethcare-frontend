import moment from "moment";
import { convertMomentToMilliseconds } from "../utils/convert.utils";

const ClinicFormValueToClinicRegisterData = (values) => {
  return {
    username: values.username,
    password: values.password,
    confirmPassword: values.confirmPassword,
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    email: values.email,
    phoneNumber: values.phoneNumber,
    clinicName: values.clinicName,
    clinicTaxCode: values.clinicTaxCode,
    clinicAddress: values.clinicAddress,
    clinicEmail: values.clinicEmail,
    wardId: values.location[2],
    startTimeShift1: convertMomentToMilliseconds(
      moment(values.operatingTimeMorning[0])
    ),
    endTimeShift1: convertMomentToMilliseconds(
      moment(values.operatingTimeMorning[1])
    ),
    startTimeShift2: convertMomentToMilliseconds(
      moment(values.operatingTimeEvening[0])
    ),
    endTimeShift2: convertMomentToMilliseconds(
      moment(values.operatingTimeEvening[1])
    ),
  };
};

export default ClinicFormValueToClinicRegisterData;
