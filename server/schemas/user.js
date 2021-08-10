const mongoose = require("mongoose");
const { Schema } = mongoose;
const { roleSchema } = require("./role");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User email is required"],
    validate: {
      validator: function (value) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  role: {
    type: roleSchema,
    required: [true, "User role is required"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
  userSchema,
};
