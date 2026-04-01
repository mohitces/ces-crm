const Joi = require('joi');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const partnerIdParamsSchema = Joi.object({
  id: Joi.string().pattern(objectIdRegex).required(),
});

const baseSchema = {
  name: Joi.string().trim().min(2).max(120).required(),
  type: Joi.string().valid('client', 'technology', 'startup', 'enterprise').optional(),
  logo: Joi.string().trim().required(),
  logoPublicId: Joi.string().trim().allow('').optional(),
  bannerImage: Joi.string().trim().allow('').optional(),
  bannerImagePublicId: Joi.string().trim().allow('').optional(),
  website: Joi.string().trim().allow('').optional(),
  description: Joi.string().trim().allow('').optional(),
  status: Joi.string().valid('active', 'inactive').optional(),
  sortOrder: Joi.number().optional(),
};

const createPartnerSchema = Joi.object(baseSchema);

const updatePartnerSchema = Joi.object({
  ...baseSchema,
  name: Joi.string().trim().min(2).max(120).optional(),
  logo: Joi.string().trim().allow('').optional(),
}).min(1);

module.exports = {
  partnerIdParamsSchema,
  createPartnerSchema,
  updatePartnerSchema,
};
