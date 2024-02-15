const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    tags: [{
      type: String,
      maxLength: 10,
    }],
    dueDate: {
      type: Date,
      // required: true,
      validate: {
        validator(v) {
          return v > new Date();
        },
        message: (props) => `${props.value} is not a valid due date!`,
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  },
);

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
