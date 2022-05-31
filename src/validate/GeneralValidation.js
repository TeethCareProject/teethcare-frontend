export const REQUIRED_VALIDATOR = (fieldName) => ({
  required: true,
  message: `${fieldName} is required.`,
});

export const MAX_LENGTH_VALIDATOR = (fieldName, maxValue) => ({
  max: maxValue,
  message: `${fieldName} has max value of length is ${maxValue}`,
});

export const MIN_LENGTH_VALIDATOR = (fieldName, minValue) => ({
  min: minValue,
  message: `${fieldName} has min value of length is ${minValue}`,
});

export const EMAIL_VALIDATOR = () => [
  {
    max: 322,
    message: `Email has max value of length is 322`,
  },
  {
    type: "email",
    message: "This field is not valid E-mail!",
  },
];
