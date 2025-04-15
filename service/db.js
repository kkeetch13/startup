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

function getUser(email) {
    return userCollection.findOne({ email });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token });
  }
  
  async function addUser(user) {
    await userCollection.insertOne(user);
  }
  
  async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
  }
  
  async function addScore(score) {
    await scoreCollection.insertOne(score);
  }
  
  function getHighScores() {
    return scoreCollection
      .find({})
      .sort({ time: 1 })
      .limit(10)
      .toArray();
  }
  

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addScore,
    getHighScores,
  };
