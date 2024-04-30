const express = require('express');
const router  = express.Router();
const database = require('../db/queries/database');
const {sum, mergeQuantity} = require('./helper/helper-function')


/*
Cart Routes:
GET /cart: Retrieve all items currently in the customer's cart.
POST /cart/add: Add an item to the cart.
POST /cart/remove: Remove an item from the cart.
POST /cart/clear: Clear all items from the cart.
*/



// GET /cart: Retrieve all items currently in the customer's cart.
router.get('/', (req, res) => {
  database
  .getCartItems()
  .then(cartItems => {
    totalPrice = sum(cartItems)
    res.render('cart', {cartItems, totalPrice, mergeQuantity})
    console.log(totalPrice);
  })
  .catch(err => console.error(err));

});

// POST /cart/add: Add an item to the cart.

router.post('/', (req, res) => {
  const {menu_item_id, quantity} = req.body;
  database.addItemToCart(menu_item_id, quantity)
  .then((result) => {
    console.log('Item was added');
  }).catch((err) => {
    console.error(err)
  });
})
// PUT /cart/increment: Add quantity to the cart.

router.put('/increment', (req, res) => {
  const { id, menu_item_id } = req.body;
  database.increaseQuantity(id, menu_item_id)
    .then((result) => {
      return database.getCartItems();
    })
    .then(cartItems => {
      const totalPrice = sum(cartItems);
      // Send the updated total price along with a success status
      res.status(200).json({ totalPrice })})
    .catch((err) => {
      console.error('Error increasing quantity:', err);
      res.status(500).send('Error increasing quantity'); // Send error response
    });
});
// PUT /cart/decrement: Decrease quantity to the cart.

router.put('/decrement', (req, res) => {
  const { id, menu_item_id } = req.body;
  database.decreaseQuantity(id, menu_item_id)
    .then((result) => {
      return database.getCartItems();
    })
    .then(cartItems => {
      const totalPrice = sum(cartItems);
      // Send the updated total price along with a success status
      res.status(200).json({ totalPrice, cartItems })})
    .catch((err) => {
      console.error('Error decreasing quantity:', err);
      res.status(500).send('Error decreasing quantity'); // Send error response
    });
});
// POST /cart/remove: Remove an item from the cart.
router.delete('/', (req, res) => {
  const { id, menu_item_id } = req.body;
  database.deleteCartItems(id, menu_item_id)
    .then((result) => {
      return database.getCartItems();
    })
    .then(cartItems => {
      console.log(cartItems);
      const totalPrice = sum(cartItems);
      // Send the updated total price along with a success status
      res.status(200).json({ totalPrice })})
    .catch((err) => {
      console.error('Error deleting item:', err);
      res.status(500).send('Error deleting item'); // Send error response
    });
});


module.exports = router
