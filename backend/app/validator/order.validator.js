const { check, validationResult } = require("express-validator");

const store = [
  check("user_id")
    .isNumeric().withMessage("Invalid user ID format!")
    .not().isEmpty().withMessage("User ID is required!"),
  check("total")
    .isNumeric().withMessage("Invalid total format!")
    .not().isEmpty().withMessage("Total is required!"),
  check("items")
    .isArray({ min: 1 }).withMessage("Items should be an array with at least one item!")
    .not().isEmpty().withMessage("Items are required!"),
  check("items.*.product_id")
    .isNumeric().withMessage("Invalid product ID format!")
    .not().isEmpty().withMessage("Product ID is required for each item!"),
  check("items.*.quantity")
    .isInt({ min: 1 }).withMessage("Quantity should be at least 1!")
    .not().isEmpty().withMessage("Quantity is required for each item!"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error_data = errors.array().map((error) => ({
        item_name: error.param,
        message: error.msg,
      }));

      return res.status(422).json({
        status: 422,
        errors: error_data,
      });
    }

    next();
  },
];

module.exports = {
  store,
};
