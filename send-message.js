//to load .env content
// require('dotenv').config();


// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;




// const client = require('twilio')(accountSid, authToken);
function sendOrderConfirmation() {
  const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  client.messages
    .create({
      body: 'Your order has been received. You will receive a text-message when your order is ready for pick-up',
      from: process.env.TWILIO_FROM_NUMBER,
      to: process.env.TO_NUMBER
    })
    .then(message => {
      console.log(message.sid);

      //After 10 sec, send an order pickup message
      setTimeout(() => {
        client.messages
          .create({
            body: "Your order is ready for a pick-up. Thank you for choosing Calcifer's Hearth!",
            from: process.env.TWILIO_FROM_NUMBER,
            to: process.env.TO_NUMBER
          })
          .then(pickupMessage => console.log(pickupMessage.sid));
      }, 10000);
    });
    
};

module.exports = {sendOrderConfirmation}