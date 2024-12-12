const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    publicationDate: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Article', ArticleSchema);   