/**
 * Created by khalil on 02/12/15.
 */

var toArray = require('stream-to-array');
var xmltojson = require('./utils/xmltojson');
var xml2js = require('xml2js');


'use strict';

function Parse() {

}

/**
 * Parse taxonomy file from XML ->JSON*
 * @param taxonomieStream
 */
Parse.prototype.parseTaxonomies = function * (taxonomieStream) {
    toArray(taxonomieStream, function (err, arr) {
        if (err) return console.log(err.message);

        var content = Buffer.concat(arr);
        var parser = new xml2js.Parser();
        parser.parseString(content, function (err, res) {
            if (err) return console.log(err.message);

            var continents = res.taxonomies.taxonomy[0].node;
            return this.xmltojson.taxonomiesToJson(continents);

        });

    });

};


/**
 * Parse destination file XML -> JSON*
 * @param destinationStream
 */
Parse.prototype.parseDestination = function *(destinationStream) {
    toArray(destinationStream, function (err, arr) {
        if (err) return console.log(err.message);

        var content = Buffer.concat(arr);
        var parser = new xml2js.Parser();
        parser.parseString(content, function (err, res) {
            if (err) return console.log(err.message);
            return this.xmltojson.destinationToJson(res.destinations.destination);


        })
    });

};


module.exports = Parse;