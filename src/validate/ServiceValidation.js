import { REQUIRED_VALIDATOR } from "./GeneralValidation";

const ServiceValidation = {
  name: [REQUIRED_VALIDATOR("name")],
  price: [REQUIRED_VALIDATOR("price")],
  description: [REQUIRED_VALIDATOR("description")],
  imageUrl: [REQUIRED_VALIDATOR("imageUrl")],
};

export default ServiceValidation;
