const mongoose = require('mongoose');

const clientQuerySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    country: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    companySize: { type: String, trim: true, default: '' },
    jobTitle: { type: String, trim: true, default: '' },
    topic: { type: String, trim: true, default: '' },
    comments: { type: String, trim: true, default: '' },
    marketingOptIn: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ClientQuery = mongoose.model('ClientQuery', clientQuerySchema);

module.exports = ClientQuery;
