const DentistFormValueToDentistData = (values) => {
  return {
    username: values.username,
    password: values.password,
    confirmPassword: values.confirmPassword,
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    email: values.email,
    phoneNumber: values.phoneNumber,
    specialization: values.specialization,
    description: values.description,
  };
};

export default DentistFormValueToDentistData;
