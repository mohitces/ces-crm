const CaseStudy = require('./case-study.model');

const getCaseStudies = async () => CaseStudy.find().sort({ createdAt: -1 }).lean();
const getPublishedCaseStudies = async () =>
  CaseStudy.find({ status: 'published' }).sort({ createdAt: -1 }).lean();

const getCaseStudyById = async (id) => CaseStudy.findById(id).lean();
const getCaseStudyBySlug = async (slug) => CaseStudy.findOne({ slug }).lean();
const getPublishedCaseStudyBySlug = async (slug) =>
  CaseStudy.findOne({ slug, status: 'published' }).lean();

const createCaseStudy = async (payload) => CaseStudy.create(payload);
const updateCaseStudy = async (id, payload) =>
  CaseStudy.findByIdAndUpdate(id, payload, { new: true }).lean();
const deleteCaseStudy = async (id) => CaseStudy.findByIdAndDelete(id);

module.exports = {
  getCaseStudies,
  getPublishedCaseStudies,
  getCaseStudyById,
  getCaseStudyBySlug,
  getPublishedCaseStudyBySlug,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
