const express = require('express');
const router  = express.Router();
const database = require('../db/queries/database');

/*Menu Routes:
GET /menu: Retrieve the list of menu items.
GET /menu/:id: Retrieve a specific menu item by its ID.
*/
router.get('/', (req, res) => {
  database
  .getMenuItems()
  .then(menuItems => {
    res.render('index', {menuItems})
    // console.log(menuItems);
  })
  .catch(err => console.error(err));
});


router.get('/:category', (req, res) => {
  const category = req.params.category;
  database
  .filteredItems(category)
  .then(menuItems => {
    // res.render('index', {menuItems})
    res.json({menuItems})
    // console.log(menuItems);
  })
  .catch(err => console.error(err));
});


router.get('/:id', (req, res) => {
  const menuItemsId = database.getMenuItemsbyId();
  res.json(menuItemsId);
})

module.exports = router
