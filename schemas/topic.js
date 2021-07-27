const mongoose = require("mongoose");
const { Schema } = mongoose;

const topicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = {
  Topic,
  topicSchema,
};
