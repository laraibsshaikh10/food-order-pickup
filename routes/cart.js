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
router.get('/', (req, res) => {
  database
  .getCartItems()
  .then(cartItems => {
    res.render('cart', {cartItems})
    // console.log(cartItems);
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

// POST /cart/remove: Remove an item from the cart.
router.delete('/', (req, res) => {
  const { id, menu_item_id } = req.body;
  database.deleteCartItems(id, menu_item_id)
    .then((result) => {
      console.log('Item was deleted');
      res.sendStatus(200); // Send success response
    })
    .catch((err) => {
      console.error('Error deleting item:', err);
      res.status(500).send('Error deleting item'); // Send error response
    });
});


module.exports = router
