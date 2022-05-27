import { CallAPI } from "./axiosBase";

export const patientRegisterAPI = (
  username,
  password,
  confirmPassword,
  firstName,
  lastName,
  gender,
  email,
  phoneNumber
) =>
  CallAPI("/patients", "POST", {
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    gender,
    email,
    phoneNumber,
  });

export const managerRegisterAPI = (
  username,
  password,
  confirmPassword,
  firstName,
  lastName,
  gender,
  phoneNumber,
  clinicName,
  clinicTaxCode,
  clinicAddress,
  wardId
) =>
  CallAPI("/managers", "POST", {
    username,
    password,
    confirmPassword,
    firstName,
    lastName,
    gender,
    phoneNumber,
    clinicName,
    clinicTaxCode,
    clinicAddress,
    wardId,
  });
