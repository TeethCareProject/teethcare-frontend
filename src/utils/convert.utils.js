export const convertMomentToDate = (momentData) => {
  return new Date().setMilliseconds(momentData.utc().valueOf());
};

export const convertMomentToMilliseconds = (momentData) => {
  return momentData.utc().valueOf();
};
