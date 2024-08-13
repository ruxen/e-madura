const Order = require("../model/order.model");
const Item = require("../model/item.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  try {
    const orders = await Order.query().withGraphFetched("items");

    res.status(200).json({
      message: "Orders retrieved successfully!",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch orders. Please try again later!",
    });
  }
};

const store = async (req, res) => {
  const trx = await Order.startTransaction();

  try {
    const { user_id, total, items } = req.body;

    const order = await Order.query(trx).insert({
      user_id,
      total
    });

    const productIds = items.map(item => item.product_id);
    const products = await Product.query(trx).whereIn('id', productIds);

    const productMap = products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});

    const insertedItems = [];
    for (const item of items) {
      const insertedItem = await Item.query(trx).insert({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: productMap[item.product_id].price,
      });

      insertedItems.push(insertedItem);
    }

    await trx.commit();

    res.status(201).json({
      message: "Order and items successfully created!",
      data: order, items: insertedItems
    });
  } catch (error) {
    console.error(error);
    await trx.rollback();
    res.status(500).json({
      message: "Failed to create order. Please try again later!",
    });
  }
};

module.exports = {
  index,
  store,
};
