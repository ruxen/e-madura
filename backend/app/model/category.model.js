const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "slug"],

      properties: {
        name: {
          type: "string",
        },
        slug: {
          type: "string",
        },
      },
    };
  }

  static get relationMappings() {
    const Product = require("./product.model");

    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "categories.id",
          to: "products.category_id",
        },
      },
    };
  }
}

module.exports = Category;
