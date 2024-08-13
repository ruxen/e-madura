const express = require("express");

const router = express.Router();

const CategoryController = require("../app/controller/category.controller");
const CategoryValidator = require("../app/validator/category.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /category:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get all category
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/category", AuthMiddleware, CategoryController.index);

/**
 * @openapi
 * /category:
 *  post:
 *     tags:
 *     - Category
 *     summary: Add category
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *               type: string
 *               description: Name of the category
 *     responses:
 *      201:
 *        description: Success created category
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/category", AuthMiddleware, CategoryValidator.store, CategoryController.store);

/**
 * @openapi
 * /category/{slug}:
 *  get:
 *     tags:
 *     - Category
 *     summary: Get category based on slug
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: slug
 *       in: path
 *       description: The slug of the category
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/category/:slug", AuthMiddleware, CategoryController.show);

module.exports = router;
