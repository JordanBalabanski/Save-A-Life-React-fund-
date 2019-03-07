const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: String,
    default: 'Guest'
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
    type: String,
    default: `${new Date().getHours}:${new Date().getMinutes} ${new Date().getDay} ${new Date().getMonth} ${new Date().getFullYear}`
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;