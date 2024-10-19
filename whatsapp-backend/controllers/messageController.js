const axios = require("axios");
require("dotenv").config();
const express = require('express');
const app = express();
                

const { WA_PHONE_NUMBER_ID, CLOUD_API_ACCESS_TOKEN, CLOUD_API_VERSION } = process.env;

console.log(WA_PHONE_NUMBER_ID,"WA_PHONE_NUMBER_ID");


async function sendMessage(req, res) {
  const { recipient_number, message_body } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/${CLOUD_API_VERSION}/${WA_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: recipient_number,
        text: { body: message_body },
      },
      {
        headers: {
          Authorization: `Bearer ${CLOUD_API_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true, response: response.data });
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        success: false,
        error: error.response ? error.response.data : error.message,
      });
  }
}



// Webhook Endpoint
app.post(`/${process.env.WEBHOOK_ENDPOINT}`, (req, res) => {
    const incomingMessage = req.body;
        
    // Verification of incoming webhook (if needed)
    if (req.query['hub.mode'] && req.query['hub.verify_token'] === process.env.WEBHOOK_VERIFICATION_TOKEN) {
        res.status(200).send(req.query['hub.challenge']);
        return;
    }

    
    if (incomingMessage && incomingMessage.entry) {
        incomingMessage.entry.forEach(entry => {
            entry.changes.forEach(change => {
                const messages = change.value.messages;
                if (messages) {
                    messages.forEach(message => {
                        console.log(`Received message from ${message.from}: ${message.text.body}`);
                        // Process the incoming message here
                    });
                }
            });
        });
    }

    // Respond with a 200 OK to acknowledge receipt
    res.sendStatus(200);
});



module.exports = sendMessage;
