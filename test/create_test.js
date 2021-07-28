const assert = require("chai").assert;
const expect = require("chai").expect;
const { User } = require("../schemas/user");
const { Quiz } = require("../schemas/quiz");
const { Topic } = require("../schemas/topic");
const { Question } = require("../schemas/question");

describe("User model", () => {
  it("creates a users", async function () {
    // assertions is not included in moca so
    // require assert which was installed along with mocha
    const user = new User({
      name: "John Doe",
      email: "jdoe@gmail.com",
      role: {
        name: "parent",
      },
    });

    await user.save();
    assert.equal(user.isNew, false);
  });

  it("should not validate a user without a defaults", function () {
    const user = new User({});
    user.validate(function (err) {
      assert.ok(err);
      assert.equal(err.errors["name"].message, "User name is required");
      assert.equal(err.errors["email"].message, "User email is required");
      assert.equal(err.errors["role"].message, "User role is required");
    });
  });

  it("should not validate a user without a valid email", function () {
    const user = new User({
      name: "Ricardo Augustine",
      email: "this is email",
    });

    user.validate(function (err) {
      assert.ok(err);
      assert.equal(
        err.errors["email"].message,
        "this is email is not a valid email address"
      );
    });
  });
});

describe("Question model", () => {
  it("should not validate a question without defaults", () => {
    const question = new Question({});
    question.validate((err) => {
      assert.ok(err);
      assert.equal(err.errors["text"].message, "Text is required");
    });
  });

  it("should add a topic to a question", async () => {
    const topic = await Topic.create({
      name: "Algebra",
    });

    let question = await Question.create({
      text: "What is 1 + 1?",
      topic,
    });

    question = await Question.findById(question._id).populate("topic");
    assert.equal(question.topic.name, "Algebra");
  });
});

describe("Quiz model", () => {
  it("saves a quiz", async function () {
    const quiz = new Quiz({
      description: "Quiz 1",
    });

    await quiz.save();
    assert.equal(quiz.isNew, false);
  });

  it("should not validate a quiz without defaults", () => {
    const quiz = new Quiz({});
    quiz.validate(function (err) {
      assert.ok(err);
      assert.equal(
        err.errors["description"].message,
        "Quiz description is required"
      );
    });
  });

  it("should add a question to a quiz", async () => {
    const question = await Question.create({
      text: "What is 1 + 1?",
      answers: ["2"],
    });

    const quiz = new Quiz({
      description: "Quiz 1",
    });

    quiz.questions.push(question);
    await quiz.save();
    assert.equal(quiz.isNew, false);
    expect(quiz.questions).to.have.lengthOf(1);
    assert.equal(quiz.questions[0]._id, question._id);
  });
});

describe("Topic model", () => {
  it("should not validate a topic without defaults", () => {
    const topic = new Topic({});
    topic.validate((err) => {
      assert.ok(err);
      assert.equal(err.errors["name"].message, "Topic name is required");
    });
  });

  it("should create a topic", async () => {
    const topic = new Topic({ name: "Algebra" });
    await topic.save();
    assert.equal(topic.isNew, false);
  });
});
