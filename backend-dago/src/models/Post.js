const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    content: { type: String, default: '' },
    images: [{ type: String }],
    category: { type: String, default: '' },
    related_routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
    related_stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stop' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', content: 'text', summary: 'text' }); // full-text search (optional)
postSchema.index({ createdAt: -1 });
postSchema.index({ category: 1 });
postSchema.index({ user: 1 });

module.exports = mongoose.model('Post', postSchema);