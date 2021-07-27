const mongoose = require("mongoose");

// tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://app:password@mongo:27017/quiz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", () => console.log("Testing database connected..."))
  .on("error", (error) => {
    console.warn("Error connecting to testing database...", error);
    process.exit();
  });

// hooks which run befor tests
beforeEach(async function () {
  try {
    await mongoose.connection.collection("users").drop({});
  } catch (err) {}
});

afterEach(async function () {
  // runs after each test in this block
  try {
    await mongoose.connection.collection("users").drop({});
  } catch (err) {}
});
