const mongoose = require("mongoose");

const TypeSchema = mongoose.Schema({
  type: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Type = mongoose.model("Type", TypeSchema);

module.exports = Type;
