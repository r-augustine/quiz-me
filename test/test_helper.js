const mongoose = require("mongoose");

// tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://app:password@mongo:27017/quiz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.connection
  .once("open", () => {})
  .on("error", (error) => {
    console.warn("Error connecting to testing database...", error);
    process.exit(1);
  });

async function clearCollections() {
  // console.log("clearing collections");
  try {
    await mongoose.connection.collection("users").deleteMany({});
    await mongoose.connection.collection("quizzes").deleteMany({});
    await mongoose.connection.collection("topics").deleteMany({});
    await mongoose.connection.collections("questions").deleteMany({});
  } catch (err) {}
}

// hooks which run before every tests
beforeEach(clearCollections);

// hooks which run after ever test
afterEach(clearCollections);

after(async () => {
  // close the mongoose connection
  await mongoose.connection.close();
});
