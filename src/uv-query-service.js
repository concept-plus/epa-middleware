'use strict'

var http = require('http');

function queryToday(zipcode, callback) {
    var url = 'http://iaspub.epa.gov/enviro/efservice/getEnvirofactsUVHOURLY/ZIP/' + zipcode + '/JSON';
    console.log('/relay/uv: calling url ' + url);
    var request = http.get(url, function(response) {
        var body = '';
        response.on('data', function(chunk) {
            console.log('uv chunk = ' + chunk);
            body += chunk;
        });
        response.on('end', function() {
            callback(null, { status: response.statusCode, body: body });
        });
    });
    request.end();
}

exports.queryToday = queryToday;
