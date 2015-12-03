/**
 * Created by khalil on 02/12/15.
 */
'use strict';

var toArray = require('stream-to-array');
var xmltojson = require('./utils/xmltojson');
var xml2js = require('xml2js');
var gen = require('./utils/gen');
var parser = new xml2js.Parser();


/**
 * Parse taxonomy file from XML ->JSON*
 * @param taxonomieStream
 */
exports.parseTaxonomies = function (taxonomieStream) {
    console.log("IN");
    var result;
    return gen.Promise(function (resolve, reject) {

        toArray(taxonomieStream).then(function (arr) {


            let content = Buffer.concat(arr);


            return parser.parseString(content, function (err, res) {
                if (err) return console.log(err.message);

                var continents = res.taxonomies.taxonomy[0].node;
                resolve(xmltojson.taxonomiesToJson(continents));


            }).catch(function (err) {
                console.log(err.message);
                reject(err);
            });


        });
    });
};


/**
 * Parse destination file XML -> JSON*
 * @param destinationStream
 */
exports.parseDestination = function (destinationStream) {
    return gen.Promise(function (resolve, reject) {
        toArray(destinationStream).then(function (arr) {
            let content = Buffer.concat(arr);
            parser.parseString(content, function (err, res) {
                if (err) return console.log(err.message);
                resolve(xmltojson.destinationToJson(res.destinations.destination));
            })
        }).catch(function (err) {
            console.log(err.message);
            reject(err);
        });
    });
};
