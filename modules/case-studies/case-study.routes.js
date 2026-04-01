const express = require('express');
const caseStudyController = require('./case-study.controller');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/roles');
const upload = require('./case-study.upload');
const {
  caseStudyIdParamsSchema,
  caseStudySlugParamsSchema,
  createCaseStudySchema,
  updateCaseStudySchema,
} = require('./case-study.validation');

const router = express.Router();

router.get('/public', caseStudyController.getPublishedCaseStudies);
router.get(
  '/public/:slug',
  validate(caseStudySlugParamsSchema, 'params'),
  caseStudyController.getPublishedCaseStudyBySlug,
);

router.get('/', requireAuth, caseStudyController.getCaseStudies);
router.get(
  '/:id',
  requireAuth,
  validate(caseStudyIdParamsSchema, 'params'),
  caseStudyController.getCaseStudyById,
);
router.post(
  '/',
  requireAuth,
  requireRole('admin', 'editor'),
  upload.fields([
    { name: 'clientLogo', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
    { name: 'mediaImages', maxCount: 20 },
  ]),
  validate(createCaseStudySchema),
  caseStudyController.createCaseStudy,
);
router.put(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  upload.fields([
    { name: 'clientLogo', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
    { name: 'mediaImages', maxCount: 20 },
  ]),
  validate(caseStudyIdParamsSchema, 'params'),
  validate(updateCaseStudySchema),
  caseStudyController.updateCaseStudy,
);
router.delete(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  validate(caseStudyIdParamsSchema, 'params'),
  caseStudyController.deleteCaseStudy,
);

module.exports = router;
