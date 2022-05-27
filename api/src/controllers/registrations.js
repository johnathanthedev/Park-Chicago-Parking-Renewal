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
  const { email, password } = req.body;

  try {
    const user = await User.create({
      email,
      password,
    });

    res.json({
      user,
    });
  } catch (error) {
    res.json({
      errors: error,
    });
  }
});

module.exports = router;
