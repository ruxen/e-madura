const { check, validationResult } = require("express-validator");

const store = [
  check("name")
    .not().isEmpty().withMessage("Name is required!"),

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
