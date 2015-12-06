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


exports.generateHtmls = function (taxonomies, destinations, destinationFile, sourceFile) {
    var self = this;


    for (var i = 0; i < destinations.length; i++) {
        var tax = [];
        for (var j = 0; j < taxonomies.length; j++) {
            if (_.includes(taxonomies[j], destinations[i].id)) {
                tax.push(taxonomies[j]);
            }
        }
        self.createDestionationDirectory(tax, destinations[i], destinationFile, sourceFile)
            .then(function (result) {
                return self.addDestinationJson(result, destinationFile);
            }).spread(function (res) {
                console.log(res);
            });

    }


};
exports.createDestionationDirectory = function (taxonomies, destination, destinationFile, sourceFile) {

    return q.Promise(function (resolve, reject) {
        var dest = destinationFile + '/' + destination.name;
        fse.copy(sourceFile, dest, function (err) {
                if (err) {
                    reject(err);
                }
                resolve({destination: destination, taxonomies: taxonomies });
            }
        );

    });
};

exports.addDestinationJson = function (data, destinationFile) {
    var adddestination = q.Promise(function (resolve, reject) {
        var dest = destinationFile + data.destination.name;
        json2file.writeFile(dest + '/data/destination.json', data.destination, function (err) {
            if (err) {
                reject(err);
            }
            resolve('SUCCESS');
        })
    });

    var addTaxonomies = q.Promise(function (resolve, reject) {
        var dest = destinationFile + data.destination.name;
        json2file.writeFile(dest + '/data/taxonomies.json', data.taxonomies, function (err) {
            if (err) {
                reject(err);
            }
            resolve('SUCCESS');
        })
    });


    return q.all([addTaxonomies, adddestination]);


};


exports.htmlWriter = function (filesList, outputDestination) {
    return  q.Promise(function (resolve, reject) {
        for (let i = 0; i < filesList.length; i++) {
            console.log(filesList, outputDestination);
            fs.writeFileSync(outputDestination + filesList[i].name + '.html', filesList[i].content);
        }
        resolve('SUCCESS');
    });
};