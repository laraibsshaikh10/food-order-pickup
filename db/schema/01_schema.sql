-- Create tables
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;


CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT,
  photo_url VARCHAR(255),
  rating INTEGER NOT NULL
);


CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  UNIQUE (menu_item_id)
);


CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_code VARCHAR(255) UNIQUE,
  total_cost INTEGER NOT NULL DEFAULT 0,
  instructions TEXT,
  client_name VARCHAR(255),
  phone_number VARCHAR(12) NOT NULL,
  status VARCHAR(20),
  date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id VARCHAR(255) REFERENCES orders(order_code) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
);
