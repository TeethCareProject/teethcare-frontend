const ClinicFormValueToClinicRegisterData = (values) => {
  return {
    username: values.username,
    password: values.password,
    confirmPassword: values.confirmPassword,
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    phoneNumber: values.phoneNumber,
    clinicName: values.clinicName,
    clinicTaxCode: values.clinicTaxCode,
    clinicAddress: values.clinicAddress,
    clinicEmail: values.clinicEmail,
    wardId: values.wardId,
  };
};

export default ClinicFormValueToClinicRegisterData;
