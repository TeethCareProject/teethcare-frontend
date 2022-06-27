export const convertMomentToDate = (momentData) => {
  return new Date(momentData.utc());
};

export const convertMomentToMilliseconds = (momentData) => {
  return momentData.utc().valueOf();
};

export const convertMillisecondsToDate = (milliseconds) => {
  return new Date(milliseconds).toLocaleString();
};

export const getTimeRange = (start, end) => {
  const range = [];
  for (let i = parseInt(start); i < parseInt(end); i++) {
    range.push(i);
  }
  return range;
};

export const convertMillisecondsToHour = (milliseconds) => {
  //must shift 7 hour for correct display
  return Math.floor(milliseconds / (60 * 60 * 1000)) + 7;
};

export const getDisabledTime = (clinicData) => {
  let start1 = clinicData?.startTimeShift1;
  let end1 = clinicData?.endTimeShift1;
  let start2 = clinicData?.startTimeShift2;
  let end2 = clinicData?.endTimeShift2;

  let range1 = getTimeRange(0, start1);
  let range2 = getTimeRange(end1 + 1, start2);
  let range3 = getTimeRange(end2 + 1, 24);

  return [...range1, ...range2, ...range3];
};

export const convertDateToMilliseconds = (date) => {
  return new Date(date).getTime();
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });
