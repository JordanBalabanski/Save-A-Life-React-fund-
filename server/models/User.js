const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: Schema.Types.String,
    required: true
  },
  roles: [{
    type: mongoose.Schema.Types.String
  }],
  salt: {
    type: Schema.Types.String,
    required: true
  },
  myPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Animal'
  }]
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

    return currentHashedPass === this.hashedPassword;
  },

  isInRole: function (role) {
    return this.roles.indexOf(role) !== -1;
  }
});

const User = mongoose.model('User', userSchema)

module.exports = User;

  User.seedAdmin = async () => {
    try {
      let users = await User.find();
      if (users.length > 0) return;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword('123', salt);
      return User.create({
        salt,
        username: 'admin',
        hashedPassword,
        roles: ['admin']
      });
    } catch (e) {
      console.log(e);
    }
  };