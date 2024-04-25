const express = require('express');
const router  = express.Router();
const database = require('../db/queries/database');

/*Menu Routes:
GET /menu: Retrieve the list of menu items.
GET /menu/:id: Retrieve a specific menu item by its ID.
*/
router.get('/', (req, res) => {
  menuItems = database
  .getMenuItems()
  .then(menuItems => {
    res.render('index', {menuItems})
    // console.log(menuItems);
  })
  .catch(err => console.error(err));
});


router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredItems = database.filterMenuItemsByCategory(category);

  if (filteredItems.length > 0) {
    res.json(filteredItems);
  } else {
    res.status(404).json({message: 'The selected menu item is not found.'});
  }
});

router.get('/:id', (req, res) => {
  const menuItemsId = database.getMenuItemsbyId();
  res.json(menuItemsId);
})

module.exports = router
