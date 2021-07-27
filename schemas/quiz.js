const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema({
  descripton: {
    type: String,
    required: true,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
  },
});

const Test = mongoose.model("Quiz", quizSchema);

module.exports = {
  Test,
  quizSchema,
};
