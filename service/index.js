const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { userCollection, scoreCollection } = require('./db.js');

const app = express();
const port = process.argv[2] || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const authCookieName = 'token';

const apiRouter = express.Router();
app.use('/api', apiRouter);


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
    token: uuid.v4(),
  };

  await userCollection.insertOne(user);
  setAuthCookie(res, user.token);
  res.status(200).send({ email: user.email });
});


apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userCollection.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
    await userCollection.updateOne({ email }, { $set: { token: user.token } });
    setAuthCookie(res, user.token);
    return res.status(200).send({ email: user.email });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});


apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  await userCollection.updateOne({ token }, { $unset: { token: "" } });
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = await userCollection.findOne({ token });
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  req.user = user; 
  next();
};


apiRouter.get('/scores', verifyAuth, async (_req, res) => {
  const scores = await scoreCollection
    .find({})
    .sort({ time: 1 })
    .limit(10)
    .toArray();
  res.send({ scores });
});


apiRouter.post('/score', verifyAuth, async (req, res) => {
  const { time, date } = req.body;
  const newScore = {
    name: req.user.email,
    time,
    date,
  };

  await scoreCollection.insertOne(newScore);

  const topScores = await scoreCollection
    .find({})
    .sort({ time: 1 })
    .limit(10)
    .toArray();

  res.send({ scores: topScores });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function setAuthCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
