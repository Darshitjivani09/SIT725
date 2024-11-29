var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://s224749274:Djivani23@cluster0.i3djr.mongodb.net/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});