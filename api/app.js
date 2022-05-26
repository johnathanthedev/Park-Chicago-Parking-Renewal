const express = require('express');
const app = require('express')();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/registrations', require('./src/controllers/registrations'));

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
