const mongoose = require("mongoose");

const DietSchema = mongoose.Schema({
  diet: [
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

const Diet = mongoose.model("Diet", DietSchema);

module.exports = Diet;
