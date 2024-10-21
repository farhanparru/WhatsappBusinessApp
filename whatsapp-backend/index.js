const express = require('express');
const sendMessage = require('../whatsapp-backend/controllers/messageController');
const receivingMessage = require('../whatsapp-backend/controllers/messageController')
const getMessages = require('../whatsapp-backend/controllers/messageController')
const cors = require('cors'); // Add this line
require('../whatsapp-backend/DB/Database')       
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;


app.use(cors({
    origin:'https://chat.invenro.com',
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use(express.json());
app.post('/api/sendmessage', sendMessage);
app.post(process.env.WEBHOOK_ENDPOINT, receivingMessage); 
app.get('/api/getMessages', getMessages); 


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
