// middleware/db.js : connect to the MongoDB server and get the reference to the database

const { MongoClient, ServerApiVersion } = require('mongodb');

const url = "mongodb+srv://sans23:sans23@cluster0.imfbwwj.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'learningpath';

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

// Connect to the MongoDB server
async function connectdb() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Get the reference to the database
function getDatabase() {
  return client.db(dbName);
}

module.exports = { connectdb, getDatabase };
