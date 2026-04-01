const mongoose = require('mongoose');

const { Schema } = mongoose;

const PARTNER_TYPE = ['client', 'technology', 'startup', 'enterprise'];
const STATUS_ENUM = ['active', 'inactive'];

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: PARTNER_TYPE,
      default: 'client',
    },
    logo: {
      type: String,
      required: true,
    },
    logoPublicId: {
      type: String,
      default: '',
    },
    bannerImage: {
      type: String,
      default: '',
    },
    bannerImagePublicId: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: STATUS_ENUM,
      default: 'active',
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

partnerSchema.pre('save', function () {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.model('Partner', partnerSchema);
