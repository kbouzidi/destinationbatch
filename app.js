/**
 * Created by khalil on 30/11/15.
 */


'use strict';

var log4js = require('log4js'),
    logger = log4js.getLogger('APP'),
    fs = require('fs'),
    batchArgu = process.argv.slice(2),
    taxonomieFile = batchArgu[0],
    destinationFile = batchArgu[1],
    parser = require('./lib/parser'),
    q = require('./lib/utils/q'),
    gen = require('./lib/documentgenerator');

var taxonomieStream = fs.createReadStream(taxonomieFile);
var destinationStream = fs.createReadStream(destinationFile);


var outputDestination = __dirname + batchArgu[2];
var templateSource = __dirname + '/template/';


q.all([parser.parseTaxonomies(taxonomieStream), parser.parseDestination(destinationStream)])
    .spread(function (taxonomies, destination) {
        return gen.generateHtmls(taxonomies, destination, outputDestination, templateSource);
    }).then(function (result) {
        logger.info(result);
        return result;
    }).catch(function (error) {
        logger.error(error);
    });

