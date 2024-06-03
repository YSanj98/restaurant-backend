const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your restaurant name"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please enter address of restaurant"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please enter address of restaurant"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", userSchema);
