'use strict'

var http = require('http');
var async = require('async');
var moment = require('moment');

function queryCurrent(zipcode, callback) {
    return query('current', zipcode, null, callback);
}

function queryRange(zipcode, callback) {

    async.parallel([

        query.bind(null, 'historical', zipcode, moment().subtract(3, 'days').format('YYYY-MM-DDT00-0000')),
        query.bind(null, 'historical', zipcode, moment().subtract(2, 'days').format('YYYY-MM-DDT00-0000')),
        query.bind(null, 'historical', zipcode, moment().subtract(1, 'days').format('YYYY-MM-DDT00-0000')),
        query.bind(null, 'current', zipcode, null),
        query.bind(null, 'forecast', zipcode, moment().add(1, 'days').format('YYYY-MM-DD'))

    ], function(err, results) {
        console.log(JSON.stringify(results));
        if (err) {
            return callback(err);
        }
        return callback(null, { status: 200, body: results });
    });
}

function query(service, zipcode, date, callback) {

    var url;
    if (service === 'historical' || service === 'current') {
        url = 'http://www.airnowapi.org/aq/observation/zipCode/' + service + '/';
    } else {
        url = 'http://www.airnowapi.org/aq/forecast/zipCode/';
    }
    var queryParams = [
        'format=application/json',
        'zipCode=' + zipcode,
        'distance=500',
        'API_KEY=193C637C-1EDD-4F7A-A9FC-618AFF9FFD2D'
    ];
    if (date) {
        queryParams.push('date=' + date);
    }
    url += '?' + queryParams.join('&');

    console.log('/relay/aqi: calling url ' + url);
    var request = http.get(url, function(response) {
        var body = '';
        response.on('data', function(chunk) {
            console.log('http:data for ' + service);
            body += chunk;
        });
        response.on('end', function() {
            console.log('http:end for ' + service);
            try {
                body = JSON.parse(body);
            } catch(parseErr) {
                console.log(JSON.stringify(parseErr));
            }
            callback(null, { status: response.statusCode, body: body });
        });
    });
    request.end();
}

exports.queryCurrent = queryCurrent;
exports.queryRange = queryRange;
