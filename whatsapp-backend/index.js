const express = require('express');
const sendMessage = require('../whatsapp-backend/controllers/messageController');
const cors = require('cors'); // Add this line
          


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin:'https://chat.invenro.com/',
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());



app.post('/api/sendmessage', sendMessage);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
