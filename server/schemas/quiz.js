const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema({
  description: {
    type: String,
    required: [true, "Quiz description is required"],
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = {
  Quiz,
  quizSchema,
};
