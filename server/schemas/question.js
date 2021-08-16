const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Question must have a title"],
  },
  description: {
    type: String,
    required: [true, "Question must have a description"],
  },
  answers: {
    type: [String],
    required: [true, "Question must have at least on answer"],
  },
  difficulty: {
    type: String,
    required: [true, "Question difficulty is required"],
    enum: {
      values: ["easy", "medium", "hard"],
      message: "{VALUE} is not a valid difficulty",
    },
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
