const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { Question } = require("../../schemas/question");

const createQuestionValidator = [
  check("title", "Question title is required").notEmpty(),
  check("description", "Question description is required").notEmpty(),
  check("answers", "Question must have at least one answer").notEmpty(),
  check("difficulty", "Question difficulty is required").notEmpty(),
];

router.post("/create", createQuestionValidator, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, answers, difficulty, topic } = req.body;

  try {
    const question = await Question.create({
      title,
      description,
      answers,
      difficulty,
      topic,
    });

    return res.json(question);
  } catch (error) {
    const { errors } = error;

    if (errors) {
      const _errors = [];

      for (let key in errors) {
        const { message: msg, path: param } = errors[key];
        _errors.push({ msg, param, location: "body" });
      }

      const payload = {
        errors: _errors,
      };

      return res.status(400).json(payload);
    }

    return res.status(500).json("Something went wrong");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const questions = await Question.find();
    return res.json(questions);
  } catch (errors) {
    if (typeof errors === mongoose.Error.ValidationError) {
      const _errors = [];
      for (let key in errors) {
        const { message: msg, path: param } = errors[key];
        _errors.push({ msg, param, location: "body" });
      }

      const payload = {
        errors: _errors,
      };
      return res.status(400).json(payload);
    }

    console.log(errors);
    return res.status(500).json("error");
  }
});

module.exports = router;
