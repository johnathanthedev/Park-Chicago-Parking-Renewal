const router = require('express').Router();
const ParkChicagoScraper = require('../services/ParkChicagoScraper');

router.post('/extend-time', async (req, res) => {
  const parkChicagoScraper = new ParkChicagoScraper();
  await parkChicagoScraper.beginScrape();
});

module.exports = router;
