'use strict';
var assert = require('chai').assert;
var fs = require('fs');
var fse = require('fs-extra');
var os = require('os');
var path = require('path');
var parser = require('../lib/parser');
var json2file = require('jsonfile');
var gen = require('../lib/documentgenerator');
var _ = require('lodash');
var path = require('path');


var destinationsJson, taxonomieJson;

describe('Test parser', function () {


    it('Test taxonomies parse', function (done) {
        var taxonomieStream = fs.createReadStream(__dirname + '/testdata/input/taxonomy.xml');
        assert.isNotNull(taxonomieStream);
        parser.parseTaxonomies(taxonomieStream).then(function (result) {
            assert.isNotNull(result);
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

    it('Test destinations parse', function (done) {
        var destinations = fs.createReadStream(__dirname + '/testdata/input/destinations.xml');
        assert.isNotNull(destinations);
        parser.parseDestination(destinations).then(function (result) {
            assert.isNotNull(result);
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
        assert.isNotNull(taxonomieJson);
        assert.isNotNull(destinationsJson);
        gen.generateHtmls(taxonomieJson, destinationsJson, __dirname + '/testdata/output/', path.dirname(__dirname) + '/template/').then(function (res) {
            assert.equal('SUCCESS', res.result);
            done();
        }).catch(function (err) {
            assert.isNull(err, 'there was no error');

        });

    });


    it('Test if all destination were created ', function (done) {
        if (os.platform() == 'darwin') {
            fse.removeSync(__dirname + '/testdata/output/' + '.DS_Store');
        }
        var files = fs.readdirSync(__dirname + '/testdata/output/');
        assert.equal(destinationsJson.length, files.length);
        done();


    });

});
