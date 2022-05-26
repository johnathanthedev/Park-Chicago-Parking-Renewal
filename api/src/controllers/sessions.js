const router = require('express').Router();
const bcrypt = require('bcrypt');
const models = require('../models');
const { User } = models;

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
      res.json({
        message: 'No user found',
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.userId = user.id;
        res.json({ user });
      } else {
        res.json({ message: 'Invalid credentials' });
      }
    }
  } catch (error) {
    res.json({ error });
  }
});

router.get('/ping', (req, res) => {
  res.json({
    userId: req.session.userId ? req.session.userId : null,
  });
});

router.delete('/sign-out', (req, res) => {
  req.session = null;
  // delete req.session.userId;
  res.json({
    message: 'Signed out successfully',
  });
});

module.exports = router;
