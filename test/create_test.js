const assert = require("chai").assert;
const expect = require("chai").expect;
const { User } = require("../schemas/user");

describe("Creating documents", () => {
  it("creates a users", async function () {
    // assertions is not included in moca so
    // require assert which was installed along with mocha
    const user = new User({
      name: "Ricardo Augustine",
      email: "augustineri93@gmail.com",
      role: {
        name: "admin",
      },
    });

    await user.save();
    assert.equal(user.isNew, false, "The user is created");
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
