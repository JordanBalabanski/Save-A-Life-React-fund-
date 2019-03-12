const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: String,
    default: 'Guest'
  },
  isAdmin: {
    type: String,
    required: true
  },  
  content: {
    type: String,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Animal'
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;