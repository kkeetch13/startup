const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

(async function testConnection() {
  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB for startup');
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
})();

module.exports = {
  userCollection,
  scoreCollection,
};
