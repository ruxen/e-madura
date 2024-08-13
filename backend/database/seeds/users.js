const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = async function (knex) {
  return await knex("users").insert([
    {
      name: "Ruxen",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),
    },
  ]);
};
