export const convertMomentToDate = (momentData) => {
  return new Date(momentData.utc());
};

export const convertMomentToMilliseconds = (momentData) => {
  return momentData.utc().valueOf();
};

export const convertMillisecondsToDate = (milliseconds) => {
  return new Date(milliseconds).toLocaleString();
};

export const convertMillisecondsToHour = (milliseconds) => {
  //must shift 7 hour for correct display
  return milliseconds / (60 * 60 * 1000) + 7;
};

export const getDisabledTime = (startTime1, endTime1, startTime2, endTime2) => {
  let start1 = convertMillisecondsToHour(startTime1);
  let end1 = convertMillisecondsToHour(endTime1);
  let start2 = convertMillisecondsToHour(startTime2);
  let end2 = convertMillisecondsToHour(endTime2);

  let range1 = [];
  let range2 = [];
  let range3 = [];
  for (let i = 0; i < start1; i++) {
    range1.push(i);
  }
  for (let i = parseInt(end1); i < start2; i++) {
    range2.push(i);
  }
  for (let i = parseInt(end2); i <= 24; i++) {
    range3.push(i);
  }

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
