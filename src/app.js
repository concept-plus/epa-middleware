'use strict';

var express = require('express');
var http = require('http');

var app = express();

var PORT = 8181;

app.set('x-powered-by', false);
app.set('Content-Type', 'application/json');


app.use('/relay/uv', function(req, res, next) {

    var zipcode = req.query.zipcode;
    console.log('querying UV with zipcode ' + zipcode);

    var url = 'http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/' + zipcode + '/JSON';
    console.log('/relay/uv: calling url ' + url);
    var request = http.get(url, function(response) {
        var body = '';
        response.on('data', function(chunk) {
            console.log('uv chunk = ' + chunk);
            body += chunk;
        });
        response.on('end', function() {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Content-Type', 'application/json');
            res.status(response.statusCode).send(body);
        });
    });
    request.end();
});

app.use('/relay/aqi', function(req, res, next) {

    var zipcode = req.query.zipcode;
    console.log('querying AQI with zipcode ' + zipcode);

    var url = 'http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=' + zipcode + '&distance=25&API_KEY=193C637C-1EDD-4F7A-A9FC-618AFF9FFD2D';
    console.log('/relay/aqi: calling url ' + url);
    var request = http.get(url, function(response) {
        var body = '';
        response.on('data', function(chunk) {
            console.log('aqi chunk = ' + chunk);
            body += chunk;
        });
        response.on('end', function() {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Content-Type', 'application/json');
            res.status(response.statusCode).send(body);
        });
    });
    request.end();
});

var server = app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});
