const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const app = express();
const port = process.argv[2] || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let users = [];
let scores = [];
const authCookieName = 'token';

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
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
  users.push(user);
  setAuthCookie(res, user.token);
  res.status(200).send({ email: user.email });
});

apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && (await bcrypt.compare(password, user.password))) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (req, res) => {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = (req, res, next) => {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  if (!user) {
    return res.status(401).send({ msg: 'Unauthorized' });
  }
  next();
};

apiRouter.get('/scores', verifyAuth, (_req, res) => {
  res.send({ scores });
});

apiRouter.post('/score', verifyAuth, (req, res) => {
  const newScore = req.body;
  let inserted = false;
  for (let i = 0; i < scores.length; i++) {
    if (newScore.score > scores[i].score) {
      scores.splice(i, 0, newScore);
      inserted = true;
      break;
    }
  }
  if (!inserted) {
    scores.push(newScore);
  }
  if (scores.length > 10) {
    scores = scores.slice(0, 10);
  }
  res.send({ scores });
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
