const Testimonial = require('./feedback.model');

const getFeedback = async () => Testimonial.find().sort({ createdAt: -1 });

const getFeedbackById = async (id) => Testimonial.findById(id);

const createFeedback = async (payload) => {
  const feedback = new Testimonial(payload);
  return feedback.save();
};

const updateFeedback = async (id, payload) =>
  Testimonial.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deleteFeedback = async (id) => Testimonial.findByIdAndDelete(id);

module.exports = {
  getFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
