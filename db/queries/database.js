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
  return db.query('INSERT INTO carts (menu_item_id, quantity) VALUES ($1, $2)  RETURNING *', [menu_item_id, quantity])  //change query based on how we want the cart to look
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};
// SELECT carts.id AS cart_id,
//   menu_items.id AS item_id,
//   menu_items.name,
//   menu_items.cost,
//   menu_items.photo_url,
//   SUM(carts.quantity) AS quantity
// FROM carts
// JOIN menu_items ON carts.menu_item_id = menu_items.id
// GROUP BY carts.id, menu_items.id, menu_items.name, menu_items.cost, menu_items.photo_url
const getCartItems = () => {
  return db.query('SELECT carts.id AS cart_id, menu_items.id AS item_id, menu_items.name, menu_items.cost, menu_items.photo_url, menu_items.rating, carts.quantity FROM carts JOIN menu_items ON carts.menu_item_id = menu_items.id;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};
const deleteCartItems = (id, menu_item_id) => {
  return db.query('DELETE FROM carts WHERE id = $1 AND menu_item_id = $2 returning *', [id, menu_item_id])  //change query based on how we want the cart to look
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};
const placeOrder = () => {
  return db.query(`INSERT INTO orders ()`, [])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

module.exports = { getMenuItems, addItemToCart, deleteCartItems, getCartItems, placeOrder };
