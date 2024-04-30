const db = require('../connection');

//Return all menu items
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

//Return count of a specific menu item
const countCartItems = (menu_item_id) => {
  return db.query('SELECT count(*) FROM carts WHERE menu_item_id=$1', [menu_item_id])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
};

//Update quantity of a specific menu item
const updateItemQuantity = (menu_item_id) => {
  return db.query('UPDATE carts SET quantity=quantity+1 WHERE menu_item_id=$1', [menu_item_id])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
};

//Add items to the cart
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

/* SELECT
  menu_items.id AS item_id,
  menu_items.name,
  menu_items.cost,
  menu_items.photo_url,
  SUM(carts.quantity) AS quantity
FROM
  carts
JOIN
  menu_items ON carts.menu_item_id = menu_items.id
GROUP BY
  menu_items.id,
  menu_items.name,
  menu_items.cost,
  menu_items.photo_url; */
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

module.exports = { getMenuItems, addItemToCart, deleteCartItems, getCartItems, placeOrder, getOrder, deleteCart, countCartItems, updateItemQuantity };
