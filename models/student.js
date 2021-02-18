const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true },
    credit: { type: Number, required: false, select: false }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", schema);