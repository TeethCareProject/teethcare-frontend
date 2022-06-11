export const convertMomentToDate = (momentData) => {
  return new Date(momentData.utc());
};

export const convertMomentToMilliseconds = (momentData) => {
  return momentData.utc().valueOf();
};

export const convertMillisecondsToDate = (time) => {
  return new Date(time).toLocaleString();
};

export const convertDateToMilliseconds = (date) => {
  return new Date(date).getTime();
};
