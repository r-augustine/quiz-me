const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Quiz } = require("../../schemas/quiz");

const createQuizValidator = [
  check("description", "Please enter a quiz description").notEmpty(),
  check("questions", "Please add questions to the quiz").notEmpty(),
];

router.post("/create", createQuizValidator, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { description, questions } = req.body;
  const _questions = questions.map(({ text, answers, topic }) => {
    return new Question({
      text,
      answers,
      topic,
    });
  });

  try {
    const quiz = await Quiz.create({
      description,
      questions: _questions,
    });

    return res.json(quiz);
  } catch (error) {
    const { errors } = error;

    if (errors) {
      const _errors = [];
      Object.keys(errors.keys).forEach((key) => {
        const { message: msg, path: param } = errors[key];
        _errors.push({ msg, param, location: "body" });
      });

      const payload = {
        errors: _errors,
      };

      return res.status(400).json(payload);
    }
    return res.status(500).json("Something went wrong");
  }
});

module.exports = router;
