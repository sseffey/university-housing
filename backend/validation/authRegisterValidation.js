import Joi from "joi";

const registerValidation = Joi.object({
  email: Joi.string()
  .trim()
  .lowercase()
  .email()
  .required(),


  password: Joi.string()
  .min(8)
  .required(),


  fullName: Joi.string()
  .trim()
  .min(2)
  .required(),


  universityId: Joi.string()
  .trim()
  .min(3)
  .required(),


  gender: Joi.string()
  .valid("Male", "Female")
  .required(),


  phoneNumber: Joi.string()
  .trim()
  .pattern(/^[+\d][\d\s-]{6,20}$/)
  .required(),
});

export default registerValidation;
