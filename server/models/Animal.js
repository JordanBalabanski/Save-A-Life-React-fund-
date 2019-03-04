const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;