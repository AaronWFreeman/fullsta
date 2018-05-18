'use-strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  topic: String,
  created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: {type: Date, default: Date.now}
});

const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = {BlogPost};
