const express = require('express');
const app = require('express')();
const PORT = process.env.PORT || 3000;
const db = require('./src/models');

app.use(express.json());

app.use('/registrations', require('./src/controllers/registrations'));

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
