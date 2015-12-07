/**
 * Created by khalil on 30/11/15.
 */

'use strict';

var log4js = require('log4js'),
    logger = log4js.getLogger('APP'),
    fs = require('fs'),
    batchArg = process.argv.slice(2),
    taxonomyFile = batchArg[0],
    destinationFile = batchArg[1],
    parser = require('./lib/parser'),
    q = require('./lib/utils/q'),
    gen = require('./lib/documentgenerator'),
    path = require('path');


var taxonomyStream = fs.createReadStream(taxonomyFile);
var destinationStream = fs.createReadStream(destinationFile);


var outputDestination = batchArg[2];
var templateSource = path.resolve(__dirname + '/template/');

q.all([parser.parseTaxonomies(taxonomyStream), parser.parseDestination(destinationStream)])
    .spread(function (taxonomies, destination) {
        return gen.generateHtml(taxonomies, destination, outputDestination, templateSource);
    }).then(function (res) {
        logger.info(res.result);
        return res;
    }).catch(function (error) {
        logger.error(error);
    });

