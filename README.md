## Calcifer's Hearth - Food Ordering System

Welcome to our food ordering experience for a single restaurant! This system provides a seamless way for hungry clients to browse through the menu-items by their category. Choose dishes and place orders from the comfort of their homes. Once the order has been placed, the customer receives an order confimation via text message and then another notification when their orders are ready for pick-up. The system acts as an intermediary between the client and the restaurant, ensuring smooth communication and efficient order processing.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
  - twilioAccountSid: `TWILIO_ACCOUNT_SID`
  - twilioAuthToken: `TWILIO_AUTH_TOKEN`
  - twilioFromNumber:`TWILIO_FROM_NUMBER`
  - twilioClientNumber: `TO_NUMBER`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Install relevant libraries: `npm install twilio dotenv`, `npm install body-parser`
6. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Features

- User-Friendly Interface: The website offers an intuitive interface where clients can easily browse through the menu based on their categories, select their desired dishes, and place orders.

- Order Notifications: Customers receive notifications via SMS once their order is placed and when it's ready for pick-up. 

## Implementation

This system leverages a modern telecomm API service, such as Twilio, to facilitate SMS communication between the website, clients, and the restaurant. Here's a brief overview of how it works:

1. Order Placement:
- Clients visit the restaurant's website and browse the menu.
- They select the dishes they want to order and proceed to checkout.

2. Order Fulfillment:
- Upon receiving the order, the restaurant prepares the food and specifies the estimated time required for fulfillment.
- Clients receive a notification via SMS with the estimated pick-up time.

3. Order Ready for Pick-Up:
- Once the order is ready for pick-up, the restaurant updates the system.
- Clients receive a final notification via SMS, informing them that their order is ready to be collected.

## Usage:
To use this food ordering system, follow these steps:

1. Visit the Website:
- Clients can visit the restaurant's website and browse the menu.
- Select the desired dishes and proceed to checkout.

2. Place Your Order:
- Enter the name, instructions and phone number and confirm your order.
- You will receive a confirmation SMS with your order details.

3. Wait for Updates:
You will receive another SMS with the estimated pick-up time once the restaurant confirms your order.

4. Collect Your Order:
Once you receive the notification that your order is ready, head to the restaurant for pick-up.


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Twilio 

## Collaborators
- Leilani Graham
- Hung Le
- Kim O'Dell
- Laraib Shaikh

## Note
Thank you for choosing our food ordering experience! Enjoy your meal!
