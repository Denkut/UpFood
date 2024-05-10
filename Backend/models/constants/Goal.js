const mongoose = require("mongoose");

const GoalSchema = mongoose.Schema({
  goal: [
    {
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;
