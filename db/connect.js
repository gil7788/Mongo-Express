var MongoClient = require('mongodb').MongoClient;

const connectionString = "mongodb://localhost:27017";
const client = new MongoClient(connectionString);

async function connect() {
  try {
    await client.connect();
    console.log("Connected successfully to the database");
    const db = client.db("sample_training");
    return db;
  } catch(e) {
    console.error(e);
  }
}

module.exports = connect;
