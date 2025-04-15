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
  try {
    const { email, password } = req.body;

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ msg: 'Existing user' });
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

  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send({ msg: 'Internal server error' });
  }
});



apiRouter.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userCollection.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const newToken = uuid.v4();
      await userCollection.updateOne({ email }, { $set: { token: newToken } });
      setAuthCookie(res, newToken);
      return res.status(200).send({ email: user.email });
    }

    res.status(401).send({ msg: 'Unauthorized' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send({ msg: 'Internal server error' });
  }
});



apiRouter.delete('/auth/logout', async (req, res) => {
  try {
    const token = req.cookies[authCookieName];
    await userCollection.updateOne({ token }, { $unset: { token: "" } });
    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (err) {
    console.error('Error during logout:', err);
    res.status(500).send({ msg: 'Internal server error' });
  }
});



const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies[authCookieName];
    const user = await userCollection.findOne({ token });
    if (!user) {
      return res.status(401).send({ msg: 'Unauthorized' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error('Error verifying auth:', err);
    res.status(500).send({ msg: 'Internal server error' });
  }
};



apiRouter.get('/scores', verifyAuth, async (_req, res) => {
  try {
    const scores = await scoreCollection
      .find({})
      .sort({ time: 1 })
      .limit(10)
      .toArray();
    res.send({ scores });
  } catch (err) {
    console.error('Error fetching scores:', err);
    res.status(500).send({ msg: 'Failed to fetch scores' });
  }
});



apiRouter.post('/score', verifyAuth, async (req, res) => {
  try {
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
  } catch (err) {
    console.error('Error submitting score:', err);
    res.status(500).send({ msg: 'Failed to submit score' });
  }
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
