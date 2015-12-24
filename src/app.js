'use strict';

var express = require('express');
var aqiQueryService = require('./aqi-query-service');
var uvQueryService = require('./uv-query-service');

var app = express();

var PORT = 8181;

app.set('x-powered-by', false);
app.set('Content-Type', 'application/json');

app.use('/relay', function(req, res, next) {
    var zipcode = req.query.zipcode;
    if (zipcode === undefined || zipcode === null || zipcode === '') {
        return res.status(500).send('A zipcode is required');
    }
    if (isNaN(parseInt(zipcode))) {
        return res.status(500).send({ error: 'Invalid zipcode' });
    }
    next();
})

app.use('/relay/uv', function(req, res, next) {

    var zipcode = req.query.zipcode;
    console.log('querying UV with zipcode ' + zipcode);

    uvQueryService.queryToday(zipcode, function(err, result) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Content-Type', 'application/json');
        res.status(result.status).send(result.body);
    });
});

app.use('/relay/aqi-current', function(req, res, next) {

    var zipcode = req.query.zipcode;
    console.log('querying AQI with zipcode ' + zipcode);

    aqiQueryService.queryCurrent(zipcode, function(err, result) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Content-Type', 'application/json');
        res.status(result.status).send(result.body);
    });
});

app.use('/relay/aqi-range', function(req, res, next) {

    var zipcode = req.query.zipcode;
    console.log('querying AQI range with zipcode ' + zipcode);

    aqiQueryService.queryRange(zipcode, function(err, result) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Content-Type', 'application/json');
        res.status(result.status).send(result.body);
    });
});

var server = app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
