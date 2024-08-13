const express = require("express");

const router = express.Router();

const OrderController = require("../app/controller/order.controller");
const OrderValidator = require("../app/validator/order.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /order:
 *  get:
 *     tags:
 *     - Order
 *     summary: Get all order
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
router.get("/order", AuthMiddleware, OrderController.index);

/**
 * @openapi
 * /order:
 *  post:
 *     tags:
 *     - Order
 *     summary: Add order
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - user_id
 *              - total
 *              - items
 *            properties:
 *              user_id:
 *               type: integer
 *               description: ID of the user placing the order
 *              total:
 *               type: number
 *               description: Total amount of the order
 *              items:
 *               type: array
 *               minItems: 1
 *               items:
*                  type: object
*                  required:
*                    - product_id
*                    - quantity
*                  properties:
*                    product_id:
*                      type: integer
*                      description: ID of the product being ordered
*                    quantity:
*                      type: integer
*                      minimum: 1
*                      description: Quantity of the product being ordered
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
router.post("/order", AuthMiddleware, OrderValidator.store, OrderController.store);

module.exports = router;
