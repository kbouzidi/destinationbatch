/**
 * Created by kbouzidi on 04/12/2015.
 */

'use strict';

var logger = require('log4js').getLogger('GEN');
var q = require('./utils/q');
var fs = require('fs');
var fse = require('fs-extra');
var json2file = require('jsonfile');
var _ = require('lodash');
var path = require('path');


/**
 * Generate HTMLS*
 * @param taxonomies
 * @param destinations
 * @param destinationFile
 * @param sourceFile
 */
exports.generateHtmls = function (taxonomies, destinations, destinationFile, sourceFile) {
    var self = this;

    return q.Promise(function (resolve, reject) {
        for (var i = 0; i < destinations.length; i++) {
            var tax = [];
            for (var j = 0; j < taxonomies.length; j++) {
                if (_.includes(taxonomies[j], destinations[i].id)) {
                    tax.push(taxonomies[j]);
                }
            }
            self.createDestionationRepo(tax, destinations[i], destinationFile, sourceFile)
                .then(function (result) {
                    return self.addDestinationJson(result, destinationFile);
                }).spread(function (res) {
                    //console.log(res);
                    resolve(res);
                });

        }
    });
};

/**
 * Create destination repository *
 * @param taxonomies
 * @param destination
 * @param destinationFile
 * @param sourceFile
 * @returns {*}
 */
exports.createDestionationRepo = function (taxonomies, destination, destinationFile, sourceFile) {

    return q.Promise(function (resolve, reject) {
        fse.copy(path.resolve(sourceFile), destinationFile + '/' + destination.name, function (err) {
                if (err) {
                    reject(err);
                }
                resolve({destination: destination, taxonomies: taxonomies });
            }
        );

    });
};


/**
 * Add JSON source to destination directory*
 * @param data
 * @param destinationFile
 * @returns {*}
 */
exports.addDestinationJson = function (data, destinationFile) {
    var addDestination = q.Promise(function (resolve, reject) {
        json2file.writeFile(destinationFile + data.destination.name + '/data/destination.json', data.destination, function (err) {
            if (err) {
                reject(err);
            }
            resolve({result: 'SUCCESS'});
        })
    });
    var addTaxonomies = q.Promise(function (resolve, reject) {
        json2file.writeFile(destinationFile + data.destination.name + '/data/taxonomies.json', data.taxonomies, function (err) {
            if (err) {
                reject(err);
            }
            resolve({result: 'SUCCESS'});
        })
    });


    return q.all([addTaxonomies, addDestination]);

};