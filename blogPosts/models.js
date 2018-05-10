'use-strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// const userNameSchema = mongoose.Schema({
//   userName: {type: String, required: true}
// });
//
// const userName = mongoose.model('userName', userNameSchema);

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  topic: String,
  created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  created: {type: Date, default: Date.now}
});
//
// blogPostSchema.methods.serialize = function() {
//   return {
//     title: this.title,
//     content: this.content,
//     topic: this.topic,
//     id: this._id.
//     created_by: this.created_by,
//     created: this.created
//     };
//   }

const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = {BlogPost};
