import { convertMillisecondsToHour } from "../utils/convert.utils";

const ClinicOperatingTimeMapper = (clinicData) => {
  return {
    startTimeShift1: convertMillisecondsToHour(clinicData?.startTimeShift1),
    endTimeShift1: convertMillisecondsToHour(clinicData?.endTimeShift1),
    startTimeShift2: convertMillisecondsToHour(clinicData?.startTimeShift2),
    endTimeShift2: convertMillisecondsToHour(clinicData?.endTimeShift2),
  };
};

export default ClinicOperatingTimeMapper;
