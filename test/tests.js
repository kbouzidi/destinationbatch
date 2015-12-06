'use strict';
var assert = require('chai').assert;
var fs = require('fs');
var os = require('os');
var path = require('path');
var parser = require('../lib/parser');
var jade = require('jade');
var json2file = require('jsonfile');
var gen = require('../lib/documentgenerator');

var destinationsJson, taxonomieJson;

describe('Test parser', function () {


    it('Create Taxomomies', function (done) {

        var taxonomieStream = fs.createReadStream(__dirname + '/input/taxonomy.xml');
        parser.parseTaxonomies(taxonomieStream).then(function (result) {
            taxonomieJson = result;
            json2file.writeFile(__dirname + '/testOutput/taxonomies.json', result, function (err) {
                if (err) {
                    console.log(err);
                    assert.isNull(err, 'there was no error');
                }
                done();
            })
        });

    });

    it('Create Destinations', function (done) {
        var destinations = fs.createReadStream(__dirname + '/input/destinations.xml');

        parser.parseDestination(destinations).then(function (result) {
            destinationsJson = result;
            json2file.writeFile(__dirname + '/testOutput/destinations.json', result[0], function (err) {
                if (err) {
                    assert.isNull(err, 'there was no error');
                }
                done();
            })
        });

    });

    it('Create Destination directory', function (done) {
        gen.generateHtmls(taxonomieJson, destinationsJson, __dirname + '/output/', __dirname + '/template/', function (res) {
            console.log(res);
            done();
        });
    });

});
