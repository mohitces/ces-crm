const Joi = require('joi');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const userIdParamsSchema = Joi.object({
  id: Joi.string().pattern(objectIdRegex).required(),
});

const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().trim().allow('').max(30).optional(),
  role: Joi.string().trim().max(50).optional(),
  isActive: Joi.boolean().optional(),
  profileImage: Joi.string().trim().allow('').optional(),
  sendWelcomeEmail: Joi.boolean().optional(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  mobile: Joi.string().trim().allow('').max(30).optional(),
  role: Joi.string().trim().max(50).optional(),
  isActive: Joi.boolean().optional(),
  profileImage: Joi.string().trim().allow('').optional(),
  sendWelcomeEmail: Joi.boolean().optional(),
}).min(1);

module.exports = {
  userIdParamsSchema,
  createUserSchema,
  updateUserSchema,
};
