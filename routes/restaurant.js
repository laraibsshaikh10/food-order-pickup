/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const restaurant = require('../db/queries/database');

// router.get('/', (req, res) => {
//   res.render('users');
// });

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
  const menuItemId = req.params.id;
  const menuItems = restaurant.getMenuItemsbyId(menuItemId);
  res.json(menuItems);
})


/*
Cart Routes:
GET /cart: Retrieve the items currently in the customer's cart.
POST /carts/:id/add: Add an item to the cart.
POST /carts/:id/delete: Remove an item from the cart.
POST /carts/:id/deleteAll: Clear all items from the cart.
*/
router.get('/carts/:id', (req, res) => {
  const cartId = req.params.id;
  const cartItems = restaurant.getCartItems(cartId);

  res.json(cartItems);
});

router.post('/carts/:id/add', (req, res) => {
  const cartId = req.params.id;
  const newMenuItem = req.body;
  restaurant.addItemToCart(cartId, newMenuItem);
  res.status(200).send('Menu item successfully added to the cart.');

});


router.post('/carts/:id/delete', (req, res) => {
  const cartId = req.params.id;
  const menuItemId = req.body.menuItemId;
  restaurant.deleteItemFromCart(cartId, menuItemId);
  res.status(200).send('Menu item successfully deleted from the cart.');

});

router.post('/carts/:id/deleteAll', (req, res) => {
  const cartId = req.params.id;
  restaurant.deleteAllFromCart(cartId);
  res.status(200).send('All menu items successfully deleted from the cart.');

});
/*

Order Routes:
POST /order: Place a new order. This route should include the items in the cart, customer details, and any additional order information.
GET /order/:id: Retrieve details of a specific order by its ID.

*/

/*
Admin Routes:
GET /admin/orders: Retrieve a list of all orders (might require admin privileges).
PUT /admin/orders/:id: Update the status of an order (e.g., from "pending" to "completed"). */

/*Static Admin Secret: You could have a predefined secret code or key that an admin must know and provide to access admin functionalities. This could be as simple as an environment variable or a static value within your app code (though be aware, hardcoding such values isn't recommended for production-level apps due to security concerns). Admins could provide this secret through a special input field or via an API request header. */

const adminSecret = 'MyRestaurant';
function isAuthorizedAdmin(req, res, next) {
  const secretProvided = req.headers['my-admin-secret'];
  if (secretProvided === adminSecret) {
    next();
  } else {
    res.status(403).send('Admin Authorization Failed.');
  }
}

router.get('/admin/orders', isAuthorizedAdmin, (req, res) => {
  const restaurantOrders = restaurant.getAllOrders();
  res.json(orders);
});

router.put('/admin/orders/:id', isAuthorizedAdmin, (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  restaurant.orderStatusUpdate(orderId, status);
  res.status(200).json({message: `Order Number ${orderId}: Status ${status}`})
})

/*

Notification Routes:
POST /notify/:phoneNumber: Send a text message to the customer's phone number notifying them of their order status. This route would likely be called internally by your backend once an order is placed successfully.
*/




module.exports = router;
