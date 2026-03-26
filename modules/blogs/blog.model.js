const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, trim: true, default: '' },
    content: { type: String, required: true },
    coverImageUrl: { type: String, default: '' },
    metaTitle: { type: String, trim: true, default: '' },
    metaDescription: { type: String, trim: true, default: '' },
    tags: { type: [String], default: [] },
    categories: { type: [String], default: [] },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    author: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' },
      email: { type: String, default: '' },
    },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
