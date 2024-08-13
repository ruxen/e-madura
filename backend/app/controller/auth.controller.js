const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../model/user.model");

const login = async (req, res) => {
  try {
    const user = await User.query()
      .select([
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.created_at",
        "users.updated_at",
      ])
      .where("email", req.body.email)
      .first();

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const user_data = await User.query()
        .select([
          "users.id",
          "users.name",
          "users.email",
          "users.password",
          "users.created_at",
          "users.updated_at",
        ])
        .where("id", user.id)
        .first();

      const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
        expiresIn: "2h",
      });

      user_data.token = token;

      res.status(200).json({
        message: "Login success!",
        data: user_data
      });
    } else {
      res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  login,
};
