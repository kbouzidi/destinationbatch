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
    parser = require('./lib/parser'),
    wintersmith = require('wintersmith'),
    jsonfile = require('jsonfile');


var server_port = config.port || 1405;
var server_ip_address = config.host || '127.0.0.1';

var taxonomieStream = fs.createReadStream(taxonomieFile);
var destinationStream = fs.createReadStream(destinationFile);
var outputFile = __dirname + '/output/contents/data/';

var taxonomiesData, destinationsData;


require('./common/config_app')(app, config);
logger.info('STARTING THE DESTINATION SERVER');
logger.info('-------------------------');
/*
 app.listen(server_port, server_ip_address, function () {
 logger.info("Listening on " + server_ip_address + ", server_port " + server_port)
 });
 logger.info('Started the server');
 */

//taxonomiesData = parser.parseTaxonomies(taxonomieStream);
//logger.debug(taxonomiesData);
parser.parseTaxonomies(taxonomieStream).then(function (taxonomies) {
    taxonomiesData = taxonomies;

    jsonfile.writeFile(outputFile + 'taxonomies.json', taxonomiesData, function (err) {
        console.error(err)
    })
});

parser.parseDestination(destinationStream).then(function (destinations) {
    destinationsData = destinations;
    jsonfile.writeFile(outputFile + 'destinations.json', destinationsData, function (err) {
        console.error(err)

    })
});



