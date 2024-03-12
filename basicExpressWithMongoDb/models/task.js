const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    unique: true
  },
  urgency: {
    type: Number,
    default: 3,
    min: 1,
    max: 5,
    set: function(value) {
      if (value < 1) {
        return 1;
      } else if (value > 5) {
        return 5;
      } else {
        return value;
      }
    }
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

