const db = require('../connection');

const getMenuItems = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};


const addItemToCart = (id) => {
  return db.query('SELECT name, price FROM menu_items WHERE id=$1;', [id])  //change query based on how we want the cart to look
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

const deleteItemToCart = (id) => {
  return db.query('DELETE FROM menu_items WHERE id=$1;', [id])  //change query based on how we want the cart to look
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

function filterMenuItemsByCategory(category)
function getMenuItemsbyId(menuItemsId)

function getCartItems(cartId)
function addItemToCart(cartId, newMenuItem) 
function deleteItemFromCart(cartId, menuItemId)
function deleteAllFromCart(cartId)

module.exports = { getMenuItems, addItemToCart, deleteItemToCart };