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
  return new Date(milliseconds).toLocaleString().substr(0, 8);
};

const getHour = (time) => {
  return convertMillisecondsToHour(time);
};

export const getDisabledTime = (startTime1, endTime1, startTime2, endTime2) => {
  let start1 = getHour(startTime1).substr(0, 2);
  let end1 = getHour(endTime1).substr(0, 2);
  let start2 = getHour(startTime2).substr(0, 2);
  let end2 = getHour(endTime2).substr(0, 2);

  let range1 = [];
  let range2 = [];
  let range3 = [];
  for (let i = 0; i < start1; i++) {
    range1.push(i);
  }
  for (let i = parseInt(end1) + 1; i < start2; i++) {
    range2.push(i);
  }
  for (let i = parseInt(end2) + 1; i <= 24; i++) {
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
