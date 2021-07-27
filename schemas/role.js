const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, "Role name is required"],
    enum: {
      values: ["admin", "parent", "child"],
      message: "{VALUE} is not a valid user role",
    },
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = {
  Role,
  roleSchema,
};
