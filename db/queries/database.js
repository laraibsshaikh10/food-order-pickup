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


const addItemToCart = (menu_item_id, quantity) => {
  return db.query('INSERT INTO carts (menu_item_id, quantity) VALUES ($1, $2) RETURNING *', [menu_item_id, quantity])  //change query based on how we want the cart to look
    .then(data => {
      return data.rows[0];
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

module.exports = { getMenuItems, addItemToCart, deleteItemToCart };
