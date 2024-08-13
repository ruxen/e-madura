/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("order_id").unsigned().notNullable().references("id").inTable("orders").onDelete("CASCADE");
    table.integer("product_id").unsigned().notNullable().references("id").inTable("products").onDelete("CASCADE");
    table.integer("quantity").unsigned().notNullable();
    table.decimal("price", 10, 2).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("items");
};
