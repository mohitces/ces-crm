const fs = require('fs');
const path = require('path');
const AppError = require('../../utils/AppError');
const feedbackRepository = require('./feedback.repository');

const getFeedback = async () => feedbackRepository.getFeedback();

const removeProfileImage = (imageUrl) => {
  if (!imageUrl) return;
  const marker = '/uploads/feedback/';
  const index = imageUrl.indexOf(marker);
  if (index === -1) return;
  const relative = imageUrl.slice(index);
  const filePath = path.join(__dirname, '../../', relative);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const getFeedbackById = async (id) => {
  const feedback = await feedbackRepository.getFeedbackById(id);
  if (!feedback) {
    throw new AppError('Feedback not found', 404);
  }
  return feedback;
};

const createFeedback = async (payload) => feedbackRepository.createFeedback(payload);

const updateFeedback = async (id, payload) => {
  const existing = await feedbackRepository.getFeedbackById(id);
  if (!existing) {
    throw new AppError('Feedback not found', 404);
  }

  if (typeof payload.profileImage === 'string') {
    const nextImage = payload.profileImage.trim();
    if (nextImage !== existing.profileImage) {
      removeProfileImage(existing.profileImage);
    }
    payload.profileImage = nextImage;
  }

  const updated = await feedbackRepository.updateFeedback(id, payload);
  if (!updated) {
    throw new AppError('Feedback not found', 404);
  }
  return updated;
};

const deleteFeedback = async (id) => {
  const existing = await feedbackRepository.getFeedbackById(id);
  if (!existing) {
    throw new AppError('Feedback not found', 404);
  }
  removeProfileImage(existing.profileImage);
  const deleted = await feedbackRepository.deleteFeedback(id);
  if (!deleted) {
    throw new AppError('Feedback not found', 404);
  }
};

module.exports = {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
