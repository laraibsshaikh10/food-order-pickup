const db = require('../connection');

//Get all menu items
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

// Filter items by category
const filteredItems = (category) => {
  return db.query('SELECT * FROM menu_items WHERE category = $1', [category])
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
};


const addItemToCart = (menu_item_id, quantity) => {
  return db.query(`INSERT INTO carts (menu_item_id, quantity) VALUES ($1, $2) ON CONFLICT (menu_item_id) DO UPDATE set quantity = carts.quantity + 1 RETURNING *`, [menu_item_id, quantity])  //change query based on how we want the cart to look
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

//Get all cart items
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

//Delete type of items from cart
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

//Delete all items from cart
const deleteCart = () => {
  return db.query('DELETE FROM carts RETURNING *')  //change query based on how we want the cart to look
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

// create an order
const placeOrder = (order_code, total_cost, instructions, client_name, phone_number) => {
  return db.query(`INSERT INTO orders (order_code, total_cost, instructions, client_name, phone_number, status) VALUES ($1, $2, $3, $4, $5, 'pending') RETURNING *`, [order_code, total_cost, instructions, client_name, phone_number])
  .then(data => {
    return db.query(`INSERT INTO order_details(order_id, quantity, menu_item_id)
    SELECT $1, quantity, menu_item_id from carts
    returning *`, [data.rows[0].order_code])
  })
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// Get order by its order_id
const getOrder = (order_id) => {
  return db.query('SELECT order_details.quantity, menu_items.name, orders.* FROM order_details JOIN menu_items ON order_details.menu_item_id = menu_items.id JOIN orders ON order_details.order_id = orders.order_code WHERE order_id = $1;', [order_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

//Increase item by one
const increaseQuantity = (id, menu_item_id) => {
  return db.query('UPDATE carts SET quantity = quantity + 1 WHERE id = $1 AND menu_item_id = $2 returning *', [id, menu_item_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

//Decrease item by one
const decreaseQuantity = (id, menu_item_id) => {
  return db.query('UPDATE carts SET quantity = quantity - 1 WHERE id = $1 AND menu_item_id = $2 returning *', [id, menu_item_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};
module.exports = { getMenuItems, addItemToCart, deleteCartItems, getCartItems, placeOrder, getOrder, deleteCart, increaseQuantity, decreaseQuantity, filteredItems };
