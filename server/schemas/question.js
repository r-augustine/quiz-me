const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const questionSchema = new Schema({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  answers: {
    type: [String],
    required: [true, "Please enter an answer for the question"],
  },
  topic: {
    type: ObjectId,
    ref: "Topic",
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = {
  Question,
  questionSchema,
};
