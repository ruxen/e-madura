const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Order extends Model {
  static get tableName() {
    return "orders";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "total"],

      properties: {
        user_id: {
          type: "integer",
        },
        total: {
          type: "number",
        },
      },
    };
  }

  static get relationMappings() {
    const User = require("./user.model");
    const Item = require("./item.model");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "orders.user_id",
          to: "users.id",
        },
      },
      items: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: "orders.id",
          to: "items.order_id",
        },
      },
    };
  }
}

module.exports = Order;
