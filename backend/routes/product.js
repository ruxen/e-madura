const express = require("express");

const router = express.Router();

const ProductController = require("../app/controller/product.controller");
const ProductValidator = require("../app/validator/product.validator");
const AuthMiddleware = require("../middleware/auth.middleware");
const upload = require("../config/multer");

/**
 * @openapi
 * /product:
 *  get:
 *     tags:
 *     - Product
 *     summary: Get all product
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
router.get("/product", AuthMiddleware, ProductController.index);

/**
 * @openapi
 * /product:
 *  post:
 *     tags:
 *     - Product
 *     summary: Add product
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
 *              - price
 *              - category_id
 *              - image
 *            properties:
 *              name:
 *               type: string
 *               description: Name of the product
 *              price:
 *               type: number
 *               description: Price of the product
 *              category_id:
 *               type: integer
 *               description: Category ID of the product
 *              image:
 *               type: string
 *               format: binary
 *
 *     responses:
 *      201:
 *        description: Success created product
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.post("/product", AuthMiddleware, upload.single('image'), ProductValidator.store, ProductController.store);

module.exports = router;
