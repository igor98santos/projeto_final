// import { MongoClient } from "mongodb";

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://pedro:sYkDPBI8p0Vl0KLV@cluster0.bptzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('TCC');
    const login = database.collection('login');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Jane Doe' };
    const movie = await login.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);