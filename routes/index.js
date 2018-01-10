const express = require('express');
const https = require('https');
const router = express.Router();
const rp = require('request-promise');

const conf = require('../util/conf');

const options = {
  uri: 'https://tmgdemo3.telemagic.no:8894/rest/agent',
  method: 'GET',
  auth: {
    'user': conf.AUTH_USER,
    'pass': conf.AUTH_PASSWD
  },
};

/* GET home page. */
router.get('/', function(req, res, next) {


  // first get the data from their demo site
  rp(options)
    .then(function (result) {
      // returns a json format
      console.log(result);
      console.log(result[0].agentId)
      res.send(JSON.parse(result));
    })
    .catch(function (err) {
      // something failed
      console.log(err);
    });

});

module.exports = router;
