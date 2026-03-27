const Joi = require('joi');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const caseStudyIdParamsSchema = Joi.object({
  id: Joi.string().pattern(objectIdRegex).required(),
});

const caseStudySlugParamsSchema = Joi.object({
  slug: Joi.string().trim().min(1).max(220).required(),
});

const createCaseStudySchema = Joi.object({
  clientName: Joi.string().trim().min(2).max(200).required(),
  slug: Joi.string().trim().max(220).optional(),
  status: Joi.string().valid('draft', 'published').optional(),
  featured: Joi.boolean().optional(),
  title: Joi.string().trim().min(3).max(220).required(),
  subtitle: Joi.string().trim().allow('').optional(),
  clientLogoUrl: Joi.string().allow('').optional(),
  bannerImageUrl: Joi.string().allow('').optional(),
  snapshot: Joi.string().optional(),
  about: Joi.string().optional(),
  challenges: Joi.string().optional(),
  solutions: Joi.string().optional(),
  highlights: Joi.string().optional(),
  results: Joi.string().optional(),
  mediaUrls: Joi.string().optional(),
});

const updateCaseStudySchema = Joi.object({
  clientName: Joi.string().trim().min(2).max(200).optional(),
  slug: Joi.string().trim().max(220).optional(),
  status: Joi.string().valid('draft', 'published').optional(),
  featured: Joi.boolean().optional(),
  title: Joi.string().trim().min(3).max(220).optional(),
  subtitle: Joi.string().trim().allow('').optional(),
  clientLogoUrl: Joi.string().allow('').optional(),
  bannerImageUrl: Joi.string().allow('').optional(),
  snapshot: Joi.string().optional(),
  about: Joi.string().optional(),
  challenges: Joi.string().optional(),
  solutions: Joi.string().optional(),
  highlights: Joi.string().optional(),
  results: Joi.string().optional(),
  mediaUrls: Joi.string().optional(),
}).min(1);

module.exports = {
  caseStudyIdParamsSchema,
  caseStudySlugParamsSchema,
  createCaseStudySchema,
  updateCaseStudySchema,
};
