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


var destinationsJson, taxonomieJson;

describe('Test Project', function () {


    it('Test taxonomies parse', function (done) {
        var taxonomieStream = fs.createReadStream(path.resolve(__dirname + '/Testdata/input/taxonomy.xml'));
        assert.isNotNull(taxonomieStream);
        parser.parseTaxonomies(taxonomieStream).then(function (result) {
            assert.isNotNull(result);
            taxonomieJson = result;
            json2file.writeFile(path.resolve(__dirname + '/Testdata/output/taxonomies.json'), result, function (err) {
                if (err) {
                    console.log(err);
                    assert.isNull(err, 'there was no error');
                }
                done();
            })
        });

    });

    it('Test destinations parse', function (done) {
        var destinations = fs.createReadStream(path.resolve(__dirname + '/Testdata/input/destinations.xml'));
        assert.isNotNull(destinations);
        parser.parseDestination(destinations).then(function (result) {
            assert.isNotNull(result);
            destinationsJson = result;
            json2file.writeFile(path.resolve(__dirname + '/Testdata/output/destinations.json'), result[0], function (err) {
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
        gen.generateHtml(taxonomieJson, destinationsJson, __dirname + '/Testdata/output/', path.dirname(__dirname) + '/template/').then(function (res) {
            assert.equal('SUCCESS', res.result);
            done();
        }).catch(function (err) {
            assert.isNull(err, 'there was no error');

        });

    });


    it('Test if all destination were created ', function (done) {
        if (os.platform() == 'darwin') {
            fse.removeSync(__dirname + '/Testdata/output/' + '.DS_Store');
        }
        var files = fs.readdirSync(__dirname + '/Testdata/output/');
        assert.equal(destinationsJson.length + 3, files.length);
        done();


    });

});
