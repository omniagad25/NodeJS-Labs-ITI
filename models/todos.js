const mongoose = require('mongoose');

// Todo {
//   userId: the ObjectId of the user,
//   title: String, required, min 5, max 20,
//   status: String, optional, default is “to-do” [‘to-do’, ‘in progress’, ‘done’]
//   tags:[String], optional, max length for each tag is 10
//   createdAt: Date, timeStamp,
//   updatedAt: Date, timeStamp
//   }

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
