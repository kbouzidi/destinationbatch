/**
 * Created by kbouzidi on 04/12/2015.
 */

'use strict';

var q = require('./utils/q');
var fs = require('fs');
var jade = require('jade');


function _createDestinationFile(template, taxonomie, destination) {
    
    return q.Promise(function (resolve, reject) {
       
    });
}
exports.htmlGenerator = function (template, taxonomies, destinations) {

    return q.Promise(function (resolve, reject) {
        resolve([0, 3, 5]);
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