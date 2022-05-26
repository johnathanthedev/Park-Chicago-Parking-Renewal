const router = require('express').Router();
const models = require('../models');
const { User } = models;

router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.json({
    users,
  });
});

router.post('/', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  if (User.passwordsMatch(password, passwordConfirmation)) {
    try {
      const user = await User.create({
        email,
        password,
      });

      req.session.userId = user.id;

      res.json({
        user,
      });
    } catch (error) {
      res.json({
        errors: error,
      });
    }
  } else {
    res.json({
      message: 'Passwords must match',
    });
  }
});

module.exports = router;
