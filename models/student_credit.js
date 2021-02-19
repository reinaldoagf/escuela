const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    credit: { type: Number, required: false }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentCredit", schema);