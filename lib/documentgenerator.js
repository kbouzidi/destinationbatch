/**
 * Created by kbouzidi on 04/12/2015.
 */

'use strict';

var q = require('./utils/q');
var fs = require('fs');
var fse = require('fs-extra');
var json2file = require('jsonfile');


exports.generateHtmls = function (taxonomies, destinations, destinationFile, sourceFile) {
    var self = this;
    for (var i = 0; i < destinations.length; i++) {
        self.createDestionationDirectory(taxonomies, destinations[i], destinationFile, sourceFile)
            .then(function (destinations) {
                return self.addDestinationJson(taxonomies, destinations, destinationFile);
            }).then(function (res) {
                console.log(res);
            });

    }


};
exports.createDestionationDirectory = function (taxonomies, destinations, destinationFile, sourceFile) {
    return q.Promise(function (resolve, reject) {
        var dest = destinationFile + '/' + destinations.name;
        fse.copy(sourceFile, dest, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(destinations);
            }
        );

    });
};

exports.addDestinationJson = function (taxonomies, destinations, destinationFile) {

    return q.Promise(function (resolve, reject) {
        var dest = destinationFile + destinations.name;
        json2file.writeFile(dest + '/data/destination.json', destinations, function (err) {
            if (err) {
                reject(err);
            }
            resolve('SUCCESS');
        })
    });

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