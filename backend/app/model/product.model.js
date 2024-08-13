const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "slug", "price", "category_id"],

      properties: {
        name: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        price: {
          type: "number",
        },
        image: {
          type: "string",
        },
        category_id: {
          type: "integer",
        },
      },
    };
  }

  static get relationMappings() {
    const Category = require("./category.model");
    const Item = require("./item.model");

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "products.category_id",
          to: "categories.id",
        },
      },
      items: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: "products.id",
          to: "items.product_id",
        },
      },
    };
  }
}

module.exports = Product;
