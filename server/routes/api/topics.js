const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { Topic } = require("../../schemas/topic");

const createTopicValidator = [
  //   check("name", "Please enter the topic name").notEmpty(),
];

router.post("/create", createTopicValidator, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  try {
    const topic = await Topic.create({
      name,
      description,
    });

    return res.json(topic);
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
