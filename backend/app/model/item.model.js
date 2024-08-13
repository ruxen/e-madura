const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Item extends Model {
  static get tableName() {
    return "items";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["order_id", "product_id", "quantity", "price"],

      properties: {
        order_id: {
          type: "integer",
        },
        product_id: {
          type: "integer",
        },
        quantity: {
          type: "integer",
        },
        price: {
          type: "number",
        },
      },
    };
  }

  static get relationMappings() {
    const Order = require("./order.model");
    const Product = require("./product.model");

    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "items.order_id",
          to: "orders.id",
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: "items.product_id",
          to: "products.id",
        },
      },
    };
  }
}

module.exports = Item;
