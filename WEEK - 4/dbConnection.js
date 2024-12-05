const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = `mongodb+srv://s224749274:Djivani23@cluster0.i3djr.mongodb.net/`;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('darshitsdb');
    const user = database.collection('users');

    // Query for a get record of collection
    const userdata = await user.findOne();

    var mobj = { fName: "Darshit", lName: "jivani" };

    user.insertOne(mobj, function(err, res) {
        if (err) throw err;
        console.log("1 line inserted");
        db.close();
      });
    

    console.log(userdata);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);