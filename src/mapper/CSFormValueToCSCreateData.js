const CSFormValueToCSCreateData = (values) => {
  return {
    username: values.username,
    password: values.password,
    confirmPassword: values.confirmPassword,
    firstName: values.firstName,
    role: values.role,
    lastName: values.lastName,
    gender: values.gender,
    email: values.email,
    phoneNumber: values.phoneNumber,
  };
};

export default CSFormValueToCSCreateData;
