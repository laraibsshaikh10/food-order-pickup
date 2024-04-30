/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('../db/queries/database');
const {sum, randomCodeGenerator, mergeQuantity} = require('./helper/helper-function')

// Middleware to parse JSON bodies
// router.use(express.json());
/*
Order Routes:
POST /order: Place a new order. This route should include the items in the cart, customer details, and any additional order information.
GET /order/:id: Retrieve details of a specific order by its ID.
*/

// POST /order: Place a new order. This route should include the items in the cart, customer details, and any additional order information.
router.post('/', (req, res) => {
  const {instructions, client_name, phone_number} = req.body;
  let order_code = randomCodeGenerator()

  database
  .getCartItems()
  .then(carts => {
    const total_cost = sum(carts);
    return {total_cost}
  })
  .then((result) => {
    const {total_cost} = result
    return database.placeOrder(order_code, total_cost, instructions, client_name, phone_number)
  })
  .then(menuItems => {
    res.json({ redirect: `/order/${menuItems.order_id}` });
  })
  .catch(err => console.error(err));
});

// GET /order/:id: Retrieve details of a specific order by its ID.
router.get('/:id', (req, res) => {
  let order_code = req.params.id
  database
  .getOrder(order_code)
  .then(orderDetails => {
    res.render('order', {orderDetails, mergeQuantity})
  })
  .then((result) => {
    return database.deleteCart()})
  .catch(err => console.error(err));
});


/*

Notification Routes:
POST /notify/:phoneNumber: Send a text message to the customer's phone number notifying them of their order status. This route would likely be called internally by your backend once an order is placed successfully.
*/

/*
Admin Routes:
GET /admin/orders: Retrieve a list of all orders (might require admin privileges).
PUT /admin/orders/:id: Update the status of an order (e.g., from "pending" to "completed"). */


module.exports = router;
