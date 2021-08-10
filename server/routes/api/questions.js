const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Question } = require("../../schemas/question");

const createQuestionValidator = [
  check("text", "Please enter the question description").notEmpty(),
  check("answers", "Please enter an answer for the question").notEmpty(),
];

router.post("/create", createQuestionValidator, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { text, answers, topic } = req.body;

  try {
    const question = await Question.create({
      text,
      answers,
      topic,
    });

    return res.json(question);
  } catch (error) {
    const { errors } = error;

    if (errors) {
      const _errors = [];
      Object.keys(errors).forEach((key) => {
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
