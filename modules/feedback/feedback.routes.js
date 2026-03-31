const express = require('express');
const validate = require('../../middlewares/validate');
const requireAuth = require('../../middlewares/auth');
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
router.post('/', requireAuth, validate(createFeedbackSchema), feedbackController.createFeedback);
router.post('/upload', requireAuth, upload.single('profileImage'), feedbackController.uploadProfileImage);
router.put(
  '/:id',
  requireAuth,
  validate(feedbackIdParamsSchema, 'params'),
  validate(updateFeedbackSchema),
  feedbackController.updateFeedback
);
router.delete(
  '/:id',
  requireAuth,
  validate(feedbackIdParamsSchema, 'params'),
  feedbackController.deleteFeedback
);

module.exports = router;
