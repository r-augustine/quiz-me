const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const { User } = require("../../schemas/index");

const createValidator = [
  check("name", "Please enter your name").not().isEmpty(),
  check("email", "Please enter your email address")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("role", "User role is required")
    .not()
    .isEmpty()
    .isIn(["admin", "parent", "student"])
    .withMessage("Pleace choose a role from the list"),
];

router.post("/create", createValidator, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, role } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      role,
    });

    return res.json(user);
  } catch (error) {
    // check for mongoose errors
    const { errors } = error;

    if (errors) {
      // extract errors messages
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
