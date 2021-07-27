const express = require("express");
const router = express.Router();
const { User } = require("../../schemas/index");

router.get("/", async (req, res) => {
  //   try {
  //     User.create({
  //       name: "Ricardo Augustine",
  //     });
  //   } catch (error) {
  //     res.status(400).json(error);
  //   }
});

module.exports = router;
