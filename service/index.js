const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { connectToDatabase, userCollection, scoreCollection } = require('./db.js');

const app = express();
const port = process.argv[2] || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authCookieName = 'token';

const apiRouter = express.Router();
app.use('/api', apiRouter);

// ✅ STEP 3: Create user using MongoDB
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    res.status(409).send({ msg: 'Existing user' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    token: uuid.v4()
  };

  await userCollection.insertOne(user);
  setAuthCookie(res, user.token);
  res.status(200).send({ email: user.email });
});

// ✅ Login, logout, score routes will be updated in future steps
apiRouter.post('/auth/login', async (req, res) => {
  res.status(501).send({ msg: 'Not implemented yet' });
});

apiRouter.delete('/auth/logout', (req, res) => {
  res.status(501).send({ msg: 'Not implemented yet' });
});

const verifyAuth = (req, res, next) => {
  res.status(501).send({ msg: 'Not implemented yet' });
};

apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.status(501).send({ msg: 'Not implemented yet' });
});

apiRouter.post('/score', verifyAuth, (req, res) => {
  res.status(501).send({ msg: 'Not implemented yet' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  });
}

(async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
})();
