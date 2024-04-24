/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const restaurant = require('../db/queries/database');

router.get('/', (req, res) => {
  res.render('users');
});

// Middleware to parse JSON bodies
router.use(express.json());

/*Menu Routes:
GET /menu: Retrieve the list of menu items.
GET /menu/:id: Retrieve a specific menu item by its ID.
*/
router.get('/menu_items', (req, res) => {
  const menuItems = restaurant.getMenuItems();
  res.json(menuItems);
});


router.get('/menu_items/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredItems = restaurant.filterMenuItemsByCategory(category);

  if (filteredItems.length > 0) {
    res.json(filteredItems);
  } else {
    res.status(404).json({message: 'The selected menu item is not found.'});
  }
});

router.get('/menu_items/:id', (req, res) => {
  const menuItemsId = restaurant.getMenuItemsbyId();
  res.json(menuItemsId);
})


/*
Cart Routes:
GET /cart: Retrieve the items currently in the customer's cart.
POST /cart/add: Add an item to the cart.
POST /cart/remove: Remove an item from the cart.
POST /cart/clear: Clear all items from the cart.
*/
router.get('/carts/:id', (req, res) => {
  const cartId = req.params.id;
  const cartItems = restaurant.getCartItems(cartId);

  res.json(cartItems);
});

router.post('/carts', (req, res) => {

})

/*

Order Routes:
POST /order: Place a new order. This route should include the items in the cart, customer details, and any additional order information.
GET /order/:id: Retrieve details of a specific order by its ID.

*/



/*

Notification Routes:
POST /notify/:phoneNumber: Send a text message to the customer's phone number notifying them of their order status. This route would likely be called internally by your backend once an order is placed successfully.
*/

/*
Admin Routes:
GET /admin/orders: Retrieve a list of all orders (might require admin privileges).
PUT /admin/orders/:id: Update the status of an order (e.g., from "pending" to "completed"). */


module.exports = router;
