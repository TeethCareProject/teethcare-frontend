export const convertMomentToDate = (momentData) => {
  return new Date(momentData.utc());
};

export const convertMomentToMilliseconds = (momentData) => {
  return momentData.utc().valueOf();
};