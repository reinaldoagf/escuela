const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'StudentCredit'
    }],
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Enrollment", schema);