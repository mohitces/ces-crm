const Joi = require('joi');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const queryIdParamsSchema = Joi.object({
  id: Joi.string().pattern(objectIdRegex).required(),
});

const createQuerySchema = Joi.object({
  firstName: Joi.string().trim().min(1).max(60).required(),
  lastName: Joi.string().trim().min(1).max(60).required(),
  email: Joi.string().trim().email().required(),
  country: Joi.string().trim().max(120).allow('').optional(),
  phone: Joi.string().trim().max(30).allow('').optional(),
  company: Joi.string().trim().max(120).allow('').optional(),
  companySize: Joi.string().trim().max(40).allow('').optional(),
  jobTitle: Joi.string().trim().max(80).allow('').optional(),
  topic: Joi.string().trim().max(120).allow('').optional(),
  comments: Joi.string().trim().max(2000).allow('').optional(),
  marketingOptIn: Joi.boolean().optional(),
});

module.exports = {
  queryIdParamsSchema,
  createQuerySchema,
};
