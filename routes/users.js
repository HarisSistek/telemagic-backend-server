const express = require('express');
const https = require('https');
const router = express.Router();
const rp = require('request-promise');

const conf = require('../util/conf');

// get users
router.get('/', function(req, res, next) {
  console.log("Getting users from API");

  let options = {
    uri: 'https://tmgdemo3.telemagic.no:8894/rest/agent',
    method: 'GET',
    auth: {
      'user': conf.AUTH_USER,
      'pass': conf.AUTH_PASSWD
    }
  };

  // first get the data from their demo site
  rp(options)
    .then(function (result) {
      // returns a json format
      console.log(result);
      console.log(result[0].agentId);
      res.send(JSON.parse(result));
    })
    .catch(function (err) {
      // something failed
      console.log(err.error);
    });

});

// create a new user
router.post('/', function(req, res, next) {

  console.log("Create new user:");
  console.log(req.body);

  let options = {
    uri: 'https://tmgdemo3.telemagic.no:8894/rest/agent',
    method: 'POST',
    auth: {
      'user': conf.AUTH_USER,
      'pass': conf.AUTH_PASSWD
    },
    body: req.body,
    json: true
  };

  rp(options)
    .then(function (result) {
      // returns a json format
      console.log("Result returned");
      console.log(result);

      res.send(JSON.parse(result));
    })
    .catch(function (err) {
      // something failed
      console.log("Error returned");
      console.log(err.error);
      res.status(400).send({"error_code": 100, "error_message": "Can't create new user" })
    });

});

// delete user
router.delete('/:agentId', function(req, res, next) {

  console.log("Deleting user new user:");
  console.log(req.params);

  let options = {
    uri: 'https://tmgdemo3.telemagic.no:8894/rest/agent/' + req.params.agentId,
    method: 'DELETE',
    auth: {
      'user': conf.AUTH_USER,
      'pass': conf.AUTH_PASSWD
    }
  };

  rp(options)
    .then(function (result) {
      // returns a json format
      console.log("Result returned");
      console.log(result);

      res.send(JSON.parse(result));
    })
    .catch(function (err) {
      // something failed
      console.log("Error returned");
      console.log(err.error);
      res.status(400).send({"error_code": 100, "error_message": "Can't delete user with agentId: " + req.params.agentId })
    });

});

// update user
router.put('/:agentId', function(req, res, next) {

  console.log("Update user:");
  console.log(req.params); // agent id
  console.log(req.body); // input form data

  let options = {
    uri: 'https://tmgdemo3.telemagic.no:8894/rest/agent/' + req.params.agentId,
    method: 'PUT',
    auth: {
      'user': conf.AUTH_USER,
      'pass': conf.AUTH_PASSWD
    },
    body: req.body,
    json: true
  };

  rp(options)
    .then(function (result) {
      // returns a json format
      console.log("Result returned");
      console.log(result);

      res.send(JSON.parse(result));
    })
    .catch(function (err) {
      // something failed
      console.log("Error returned");
      console.log(err.error);
      res.status(400).send({"error_code": 100, "error_message": "Can't update user with agentId: " + req.params.agentId })
    });

});


module.exports = router;
