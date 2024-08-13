exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
