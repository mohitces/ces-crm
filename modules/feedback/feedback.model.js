const mongoose = require('mongoose');

const { Schema } = mongoose;

const TESTIMONIAL_TYPE = ['text', 'video'];

const INDUSTRY_ENUM = [
  'Fintech',
  'Education',
  'Automobile',
  'Blockchain',
  'Banking',
  'Lifestyle',
  'Digital',
  'IT Services',
];

const DESIGNATION_ENUM = [
  'CEO',
  'Founder',
  'Co-Founder',
  'CTO',
  'Project Manager',
  'Director',
  'VP',
  'Other',
];

const testimonialSchema = new Schema(
  {
    testimonialText: {
      type: String,
      required: function () {
        return this.type === 'text';
      },
      trim: true,
    },
    type: {
      type: String,
      enum: TESTIMONIAL_TYPE,
      required: true,
      default: 'text',
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      enum: INDUSTRY_ENUM,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      enum: DESIGNATION_ENUM,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: function () {
        return this.type === 'video';
      },
    },
    thumbnail: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
