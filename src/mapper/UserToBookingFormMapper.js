const UserToBookingFormMapper = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    phone: user.phone,
  };
};

export default UserToBookingFormMapper;
