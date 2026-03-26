const asyncHandler = require('../../utils/asyncHandler');
const feedbackService = require('./feedback.service');

const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await feedbackService.getFeedback();
  res.json(feedback);
});

const getFeedbackById = asyncHandler(async (req, res) => {
  const feedback = await feedbackService.getFeedbackById(req.params.id);
  res.json(feedback);
});

const createFeedback = asyncHandler(async (req, res) => {
  const feedback = await feedbackService.createFeedback(req.body);
  res.status(201).json(feedback);
});

const uploadProfileImage = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: 'Profile image is required.' });
    return;
  }
  res.status(201).json({ url: `/uploads/feedback/${file.filename}` });
});

const updateFeedback = asyncHandler(async (req, res) => {
  const feedback = await feedbackService.updateFeedback(req.params.id, req.body);
  res.json(feedback);
});

const deleteFeedback = asyncHandler(async (req, res) => {
  await feedbackService.deleteFeedback(req.params.id);
  res.json({ message: 'Feedback deleted' });
});

module.exports = {
  getFeedback,
  getFeedbackById,
  createFeedback,
  uploadProfileImage,
  updateFeedback,
  deleteFeedback,
};
