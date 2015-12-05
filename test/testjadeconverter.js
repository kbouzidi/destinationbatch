'use strict';
var assert = require('chai').assert;
var fs = require('fs');
var os = require('os');
var path = require('path');
var parser = require('../lib/parser');
var jade = require('jade');
var json2file = require('jsonfile');
var gen = require('../lib/documentgenerator')

var jadDocument, destinationsJson, taxonomieJson;
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
            destinationsJson = result[0];
            json2file.writeFile(__dirname + '/testOutput/destinations.json', result[0], function (err) {
                if (err) {
                    assert.isNull(err, 'there was no error');
                }
                done();
            })
        });

    });

});

describe('Test Jade management', function () {


    it('Create Jade File', function (done) {

        var template = fs.readFileSync(__dirname + '/input/example.html', 'utf8');

        assert.isNotNull(template);
        parser.jadeConverter(template).then(function (result) {

        });

        parser.jadeConverter(template).then(function (result) {
            jadDocument = result;

            fs.writeFile(__dirname + '/testOutput/result.jade', jadDocument, function (err) {
                    if (err) {
                        assert.isNull(err, 'there was no error');
                    }
                    done();
                }
            );

        });

    });


    it('Update Jade file ', function (done) {
        let tpl = fs.readFileSync(__dirname + '/input/template.jade', 'utf8');


        var html = jade.render(tpl, {taxonomies: taxonomieJson, destination: destinationsJson});

        fs.writeFile(__dirname + '/testOutput/result.html', html, function (err) {
                if (err) {
                    assert.isNull(err, 'there was no error');
                }
                done();
            }
        )
        ;
        //console.log(html);
        //   done();
    });
});