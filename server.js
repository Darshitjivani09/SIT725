
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const router = express.Router();
const http = require("http"); // Required for creating an HTTP server
const { Server } = require("socket.io");
const port = process.env.PORT || 3000;

// Initialize Express and HTTP Server
const app = express();
const server = http.createServer(app); // Wrap Express app with HTTP server
const io = new Server(server); // Attach Socket.IO to the server


const fs = require('fs');
const path = require('path');
let socketIo = require('socket.io')(http);

// MongoDB URI and client connection
const uri = "mongodb+srv://s224749274:Djivani23@cluster0.i3djr.mongodb.net/"; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Use middleware for parsing request bodies
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Database collection reference
let usercollection = client.db('darshitsdb').collection('users');

// Endpoint to handle form submission (POST request)
app.post('/users', async (req, res) => {
  const { fName, lName } = req.body;

  // Ensure both fields are provided
  if (!fName || !lName) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const userData = { fName, lName, createdAt: new Date() }; // Prepare data for MongoDB
    await usercollection.insertOne(userData);  // Insert data into MongoDB collection
    res.status(200).json({ success: true, message: 'Form data saved successfully' });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


require('./dbConnection');
app.use('/admin', router);
socketIo.on('connection', (socket) => {
    console.log('A User Connected');
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random() * 50));
    }, 1000);
});
