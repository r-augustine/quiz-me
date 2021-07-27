const mongoose = require("mongoose");
const { Schema } = mongoose;
const { userSchema, testSchema } = require("./index");

const resultSchema = new Schema({
  user: {
    type: userSchema,
    required: true,
  },
  test: {
    type: testSchema,
    required: true,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
  },
  answers: [String],
  grade: String,
});

const Result = mongoose.model("Result", resultSchema);

module.exports = {
  Result,
  resultSchema,
};
