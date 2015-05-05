/**
 * Created by new on 5/4/15.
 */

// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs=require('fs');

var router = express.Router();

var Event = require('./../models/events.js');


var eventsRoute = router.route('/');

eventsRoute.get(function(req, res){

    res.status(200);
    res.send("hey");
});

module.exports = router;