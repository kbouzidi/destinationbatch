/**
 * Created by khalil on 02/12/15.
 */
'use strict';

var logger = require('log4js').getLogger('PARSER');
var toArray = require('stream-to-array');
var xmltojson = require('./utils/xmltojson');
var xml2js = require('xml2js');
var q = require('./utils/q');
var _ = require('lodash');
var parser = new xml2js.Parser();


/**
 * Parse taxonomy file from XML ->JSON*
 * @param taxonomieStream
 */
exports.parseTaxonomies = function (taxonomieStream) {

    return q.Promise(function (resolve, reject) {
        toArray(taxonomieStream).then(function (arr) {
            let content = Buffer.concat(arr);
            return parser.parseString(content, function (err, res) {
                if (err) {
                    reject(err.message);
                }
                let taxonomies = _.get(res, 'taxonomies.taxonomy[0].node', undefined);
               
                if (taxonomies) {
                    resolve(xmltojson.taxonomiesToJson(taxonomies));
                } else {
                    reject(new Error('Taxonomies should not be null'));
                }
            }).catch(function (err) {
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
    return q.Promise(function (resolve, reject) {
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
