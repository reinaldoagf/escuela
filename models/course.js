const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", schema);