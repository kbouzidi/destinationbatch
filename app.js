/**
 * Created by khalil on 30/11/15.
 */


'use strict';

var express = require('express'),
    config = require('./config/default.json'),
    app = express(),
    log4js = require('log4js'),
    logger = log4js.getLogger('APP'),
    fs = require('fs'),
    batchArgu = process.argv.slice(2),
    taxonomieFile = batchArgu[0],
    destinationFile = batchArgu[1],
    parser = require('./lib/parser');

var server_port = config.port || 1405;
var server_ip_address = config.host || '127.0.0.1';

var taxonomieStream = fs.createReadStream(taxonomieFile);
var destinationStream = fs.createReadStream(destinationFile);

var taxonomiesData, destinationsData;


require('./common/config_app')(app, config);
logger.info('STARTING THE DESTINATION SERVER');
logger.info('-------------------------');

app.listen(server_port, server_ip_address, function () {
    logger.info("Listening on " + server_ip_address + ", server_port " + server_port)
});
logger.info('Started the server');


//taxonomiesData = this.parser.parseTaxonomies(taxonomieStream);
//destinationsData = parser.parseDestination(destinationStream);


