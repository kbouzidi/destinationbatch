/**
 * Created by kbouzidi on 04/12/2015.
 */

'use strict';

var q = require('./utils/q');
var fs = require('fs');
var jade = require('jade');
var fse = require('fs-extra');
var json2file = require('jsonfile');


exports.generateHtmls = function (taxonomies, destinations, destinationFile, sourceFile) {
    var self = this;
    var dest;
    for (var i = 0; i < destinations.length; i++) {
        dest = destinations[i];
        self.createDestionationDirectory(taxonomies, dest, destinationFile, sourceFile)
            .then(function (destinations) {
                // console.log(res);
                return self.addDestinationJson(taxonomies, destinations, destinationFile, sourceFile);
            }).then(function (res) {
                console.log(res);
            });

    }


};
exports.createDestionationDirectory = function (taxonomies, destinations, destinationFile, sourceFile) {
    console.log("1", destinations.name);

    return q.Promise(function (resolve, reject) {
        //console.log(destinations[i].name);
        var dest = destinationFile + '/' + destinations.name;
        fse.copy('template/', dest, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(destinations);
            }
        );


    });


};

exports.addDestinationJson = function (taxonomies, destinations, destinationFile) {
    console.log("2", destinations.name);
    return q.Promise(function (resolve, reject) {
        var dest = destinationFile + destinations.name;
        json2file.writeFile(dest + '/data/destinations.json', destinations, function (err) {
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
        resolve('success');
    });


};