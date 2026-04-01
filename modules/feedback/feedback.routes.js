const express = require('express');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
const { requireRole } = require('../../middlewares/roles');
const feedbackController = require('./feedback.controller');
const upload = require('./feedback.upload');
const {
  feedbackIdParamsSchema,
  createFeedbackSchema,
  updateFeedbackSchema,
} = require('./feedback.validation');

const router = express.Router();

router.get('/', requireAuth, feedbackController.getFeedback);
router.get('/public', feedbackController.getPublicFeedback);
router.get(
  '/:id',
  requireAuth,
  validate(feedbackIdParamsSchema, 'params'),
  feedbackController.getFeedbackById
);
router.post(
  '/',
  requireAuth,
  requireRole('admin', 'editor'),
  validate(createFeedbackSchema),
  feedbackController.createFeedback
);
router.post(
  '/upload',
  requireAuth,
  requireRole('admin', 'editor'),
  upload.single('profileImage'),
  feedbackController.uploadProfileImage
);
router.put(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  validate(feedbackIdParamsSchema, 'params'),
  validate(updateFeedbackSchema),
  feedbackController.updateFeedback
);
router.delete(
  '/:id',
  requireAuth,
  requireRole('admin', 'editor'),
  validate(feedbackIdParamsSchema, 'params'),
  feedbackController.deleteFeedback
);

module.exports = router;
