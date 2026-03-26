const Joi = require('joi');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const feedbackIdParamsSchema = Joi.object({
  id: Joi.string().pattern(objectIdRegex).required(),
});

const baseSchema = {
  testimonialText: Joi.string().trim().allow('').optional(),
  type: Joi.string().valid('text', 'video').required(),
  location: Joi.string().trim().required(),
  industry: Joi.string()
    .valid(
      'Fintech',
      'Education',
      'Automobile',
      'Blockchain',
      'Banking',
      'Lifestyle',
      'Digital',
      'IT Services'
    )
    .required(),
  clientName: Joi.string().trim().required(),
  designation: Joi.string()
    .valid('CEO', 'Founder', 'Co-Founder', 'CTO', 'Project Manager', 'Director', 'VP', 'Other')
    .required(),
  companyName: Joi.string().trim().required(),
  profileImage: Joi.string().trim().required(),
  videoUrl: Joi.string().trim().allow('').optional(),
  thumbnail: Joi.string().trim().allow('').optional(),
  isActive: Joi.boolean().optional(),
  featured: Joi.boolean().optional(),
  sortOrder: Joi.number().optional(),
};

const createFeedbackSchema = Joi.object(baseSchema).custom((value, helpers) => {
  if (value.type === 'text' && !value.testimonialText) {
    return helpers.message('testimonialText is required for text testimonials');
  }
  if (value.type === 'video' && !value.videoUrl) {
    return helpers.message('videoUrl is required for video testimonials');
  }
  return value;
});

const updateFeedbackSchema = Joi.object({
  ...baseSchema,
  type: Joi.string().valid('text', 'video').optional(),
  profileImage: Joi.string().trim().allow('').optional(),
}).min(1);

module.exports = {
  feedbackIdParamsSchema,
  createFeedbackSchema,
  updateFeedbackSchema,
};
