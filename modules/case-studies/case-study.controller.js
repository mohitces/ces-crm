const asyncHandler = require('../../utils/asyncHandler');
const caseStudyService = require('./case-study.service');

const getCaseStudies = asyncHandler(async (req, res) => {
  const items = await caseStudyService.getCaseStudies();
  res.json(items);
});

const getPublishedCaseStudies = asyncHandler(async (req, res) => {
  const items = await caseStudyService.getPublishedCaseStudies();
  res.json(items);
});

const getCaseStudyById = asyncHandler(async (req, res) => {
  const item = await caseStudyService.getCaseStudyById(req.params.id);
  res.json(item);
});

const getPublishedCaseStudyBySlug = asyncHandler(async (req, res) => {
  const item = await caseStudyService.getPublishedCaseStudyBySlug(req.params.slug);
  res.json(item);
});

const createCaseStudy = asyncHandler(async (req, res) => {
  const files = req.files ? Object.values(req.files).flat() : [];
  const item = await caseStudyService.createCaseStudy(req.body, files);
  res.status(201).json(item);
});

const updateCaseStudy = asyncHandler(async (req, res) => {
  const files = req.files ? Object.values(req.files).flat() : [];
  const item = await caseStudyService.updateCaseStudy(req.params.id, req.body, files);
  res.json(item);
});

const deleteCaseStudy = asyncHandler(async (req, res) => {
  await caseStudyService.deleteCaseStudy(req.params.id);
  res.json({ message: 'Case study deleted' });
});

module.exports = {
  getCaseStudies,
  getPublishedCaseStudies,
  getCaseStudyById,
  getPublishedCaseStudyBySlug,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
