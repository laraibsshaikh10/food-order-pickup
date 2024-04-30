const express = require('express');
const router  = express.Router();
const database = require('../db/queries/database');

const bodyParser = require('body-parser');

const {sendOrderConfirmation} = require('../send-message');
const { route } = require('./cart');

router.use(bodyParser.json());

router.post('/sendOrderConfirmation', async(req, res) => {
  try {
    const {orderDetails} = req.body;
    const messageResponse = sendOrderConfirmation(orderDetails);
    res.status(200).send(messageResponse);
  } catch (error) {
    console.log('Failure to send an order confirmation message:', error);
    res.status(500).send('Failure to send an order confirmation message:');
    
  }
});