const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addScore,
  getHighScores,
} = require('./db.js');

const app = express();
const port = process.argv[2] || 3000;
const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiRouter = express.Router();
app.use('/api', apiRouter);


apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await getUser(email);
  if (existingUser) {
    res.status(409).send({ msg: 'Existing user' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  await addUser(user);

  setAuthCookie(res, user.token);
  res.status(200).send({ email: user.email });
});


apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUser(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
    await updateUser(user);
    setAuthCookie(res, user.token);
    return res.status(200).send({ email: user.email });
  }
  res.status(401).send({ msg: 'Unauthorized' });
});


apiRouter.delete('/auth/logout', async (req, res) => {
  const token = req.cookies[authCookieName];
  const user = await getUserByToken(token);
  if (user) {
    delete user.token;
    await updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});


const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = await getUserByToken(token);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  req.user = user;
  next();
};


apiRouter.get('/scores', verifyAuth, async (_req, res) => {
  const scores = await getHighScores();
  res.send({ scores });
});


apiRouter.post('/score', verifyAuth, async (req, res) => {
  const { time, date } = req.body;
  const newScore = {
    name: req.user.email,
    time,
    date,
  };

  await addScore(newScore);
  const scores = await getHighScores();
  res.send({ scores });
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
