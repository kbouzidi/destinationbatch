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
    jsonfile = require('jsonfile'),
    q = require('./lib/utils/q'),
    gen = require('./lib/documentgenerator');

var taxonomieStream = fs.createReadStream(taxonomieFile);
var destinationStream = fs.createReadStream(destinationFile);


var outputDestination = __dirname + batchArgu[2];

var template = fs.readFileSync(__dirname + '/input/example.html', 'utf8');
console.log(template);


q.all([parser.parseTaxonomies(taxonomieStream), parser.parseDestination(destinationStream) ]).spread(function (taxonomies, destination) {
    return gen.htmlGenerator(taxonomies, destination);
}).then(function (rr) {
    console.log("app", rr, outputDestination);
    return gen.htmlWriter(rr, outputDestination);
}).then(function (tt) {
    console.log(tt);
}).catch(function (err) {
    console.log(err);
});

