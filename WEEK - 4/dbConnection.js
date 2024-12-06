const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://s224749274:Djivani23@cluster0.i3djr.mongodb.net/"; // Replace with your MongoDB URI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = client;
