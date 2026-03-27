const mongoose = require('mongoose');

const snapshotSchema = new mongoose.Schema(
  {
    websiteUrl: { type: String, default: '' },
    country: { type: String, default: '' },
    industry: { type: String, default: '' },
    platform: { type: String, default: '' },
    businessInsight: { type: String, default: '' },
  },
  { _id: false }
);

const aboutSchema = new mongoose.Schema(
  {
    brandIntro: { type: String, default: '' },
    whatTheyDo: { type: String, default: '' },
  },
  { _id: false }
);

const challengesSchema = new mongoose.Schema(
  {
    problemStatements: { type: [String], default: [] },
  },
  { _id: false }
);

const solutionsSchema = new mongoose.Schema(
  {
    howWeHelped: { type: String, default: '' },
    featuresUsed: { type: [String], default: [] },
  },
  { _id: false }
);

const resultsSchema = new mongoose.Schema(
  {
    benefits: { type: [String], default: [] },
  },
  { _id: false }
);

const mediaSchema = new mongoose.Schema(
  {
    images: { type: [String], default: [] },
  },
  { _id: false }
);

const caseStudySchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    featured: { type: Boolean, default: false },

    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    bannerImage: { type: String, default: '' },
    clientLogo: { type: String, default: '' },

    snapshot: { type: snapshotSchema, default: () => ({}) },
    about: { type: aboutSchema, default: () => ({}) },
    challenges: { type: challengesSchema, default: () => ({}) },
    solutions: { type: solutionsSchema, default: () => ({}) },
    highlights: { type: [String], default: [] },
    results: { type: resultsSchema, default: () => ({}) },
    media: { type: mediaSchema, default: () => ({}) },
  },
  { timestamps: true }
);

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

module.exports = CaseStudy;
