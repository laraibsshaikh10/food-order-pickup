const express = require('express');
const router  = express.Router();
const database = require('../db/queries/database');


/*
Cart Routes:
GET /cart: Retrieve all items currently in the customer's cart.
POST /cart/add: Add an item to the cart.
POST /cart/remove: Remove an item from the cart.
POST /cart/clear: Clear all items from the cart.
*/


// GET /cart: Retrieve all items currently in the customer's cart.
router.get('/carts/:id', (req, res) => {
  const cartId = req.params.id;
  const cartItems = database.getCartItems(cartId);

  res.json(cartItems);
});

// POST /cart/add: Add an item to the cart.

router.post('/carts', (req, res) => {

})


module.exports = router
