import Joi, { ObjectSchema } from 'joi';

// Joi schema for validating user registration data
const userRegistrationSchema: ObjectSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

// Joi schema for validating user login data
const userLoginSchema: ObjectSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default userRegistrationSchema;
