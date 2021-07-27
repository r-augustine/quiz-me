const { Role, roleSchema } = require("./role.js");
const { Topic, topicSchema } = require("./topic.js");
const { User, userSchema } = require("./user.js");
const { Quiz, quizSchema } = require("./quiz.js");
const { Question, questionSchema } = require("./question.js");

module.exports = {
  Role,
  User,
  Topic,
  Quiz,
  Question,
  roleSchema,
  userSchema,
  topicSchema,
  quizSchema,
  questionSchema,
};
