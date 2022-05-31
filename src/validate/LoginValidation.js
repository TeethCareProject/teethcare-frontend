import { REQUIRED_VALIDATOR } from "./GeneralValidation";

const LoginValidation = {
  username: [REQUIRED_VALIDATOR("username")],
  password: [REQUIRED_VALIDATOR("password")],
};

export default LoginValidation;
