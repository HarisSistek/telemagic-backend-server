// npm modules
const express = require('express');
const router = express.Router();

// return a ok ping
router.get('/', function (req, res) {


  // as long someone is asking
  res.sendStatus(200);
});

module.exports = router;