import {
  convertMillisecondsToHour,
  convertMillisecondsToMinutes,
} from "../utils/convert.utils";

const ClinicOperatingTimeMapper = (clinicData) => {
  return {
    startTimeShiftHour1: convertMillisecondsToHour(clinicData?.startTimeShift1),
    startTimeShiftMinute1:
      convertMillisecondsToMinutes(
        clinicData?.startTimeShift1 % (60 * 60 * 1000)
      ) === 0
        ? "00"
        : convertMillisecondsToMinutes(
            clinicData?.startTimeShift1 % (60 * 60 * 1000)
          ),
    endTimeShiftHour1: convertMillisecondsToHour(clinicData?.endTimeShift1),
    endTimeShiftMinute1:
      convertMillisecondsToMinutes(
        clinicData?.endTimeShift1 % (60 * 60 * 1000)
      ) === 0
        ? "00"
        : convertMillisecondsToMinutes(
            clinicData?.endTimeShift1 % (60 * 60 * 1000)
          ),
    startTimeShiftHour2: convertMillisecondsToHour(clinicData?.startTimeShift2),
    startTimeShiftMinute2:
      convertMillisecondsToMinutes(
        clinicData?.startTimeShift2 % (60 * 60 * 1000)
      ) === 0
        ? "00"
        : convertMillisecondsToMinutes(
            clinicData?.startTimeShift2 % (60 * 60 * 1000)
          ),
    endTimeShiftHour2: convertMillisecondsToHour(clinicData?.endTimeShift2),
    endTimeShiftMinute2:
      convertMillisecondsToMinutes(
        clinicData?.endTimeShift2 % (60 * 60 * 1000)
      ) === 0
        ? "00"
        : convertMillisecondsToMinutes(
            clinicData?.endTimeShift2 % (60 * 60 * 1000)
          ),
  };
};

export default ClinicOperatingTimeMapper;
