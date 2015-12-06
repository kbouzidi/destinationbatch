/**
 * Created by khalil on 30/11/15.
 */


'use strict';

var config = require('./config/default.json'),
    log4js = require('log4js'),
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

var template = fs.readFileSync(__dirname, 'utf8');


q.all([parser.parseTaxonomies(taxonomieStream), parser.parseDestination(destinationStream)]).spread(function (taxonomies, destination, jadeTemplate) {
    return gen.generateHtmls(taxonomies, destination, jadeTemplate);
}).then(function (result) {
    logger.info(result);
    return result;
}).catch(function (err) {
    console.log(err);
});

