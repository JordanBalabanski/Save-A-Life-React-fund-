const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
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
  category: {
    type: String,
    required: true,
    enum: ['cat', 'dog', 'other']
  },
  imageName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    default: 'Sorry, the user hasn\'t provided contact info. Try the comment section below to connect.'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;