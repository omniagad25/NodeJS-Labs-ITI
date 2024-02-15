const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 8,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 15,
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign
        ret.password = undefined;
        return ret;
      },
    },
  },
);

usersSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
