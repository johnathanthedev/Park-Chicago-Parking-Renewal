const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const helmet = require('helmet');
const app = require('express')();
const PORT = process.env.PORT || 3000;
const db = require('./src/models');

const corsOptions = {
  origin: [`${process.env.REACT_APP_URL}`],
  methods: ['DELETE', 'POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(
  cookieSession({
    keys: [process.env.COOKIE_SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours,
    httpOnly: true,
  })
);

app.use('/registrations', require('./src/controllers/registrations'));
app.use('/sessions', require('./src/controllers/sessions'));

try {
  db.sequelize.authenticate();
  db.sequelize.sync();
  console.log('Connection to database has been established successfully');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

try {
  db.sequelize.authenticate();
  db.sequelize.sync();
  console.log('Connection to database has been established successfully');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
