/**
 * Created by khalil on 30/11/15.
 */


'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('APP');


var fs = require('fs');
var XmlStream = require('xml-stream');

var batchArgu = process.argv.slice(2);
var taxonomieFile = batchArgu[0];
var destinationFile = batchArgu[1];

var taxonomieStream = fs.createReadStream(taxonomieFile);
var taxonomieXml = new XmlStream(taxonomieStream);

var destinationStream = fs.createReadStream(destinationFile);
var destinationXml = new XmlStream(destinationStream);

taxonomieXml.preserve('taxonomies', true);
taxonomieXml.collect('node');
var countries = [],
    continent = [];

taxonomieXml.on('endElement: taxonomies', function(item) {
    var worldName = item['taxonomy']['taxonomy_name']['$text'];
    var world = item['taxonomy']['node'];

    for (let i = 0; i < world.length; i++) {
        let continentName = world[i]['node_name']['$text'];
        let countriesList = world[i]['node'];
        // console.log(countriesList)
        continent = {
            name: continentName,
            atlasId: world[i]['$']['atlas_node_id'],
            id: world[i]['$']['ethyl_content_object_id'],
            geoId: world[i]['$']['geo_id']
        }

        if (countriesList && countriesList.length > 0) {
            for (let j = 0; j < countriesList.length; j++) {
                countries.push({
                    name: countriesList[j]['node_name']['$text'],
                    continentName: continentName,
                    atlasId: countriesList[j]['$']['atlas_node_id'],
                    id: countriesList[j]['$']['ethyl_content_object_id'],
                    geoId: countriesList[j]['$']['geo_id'],
                    continent: continent


                })
            };

        }
    };

    // console.log(countries)


});


destinationXml.preserve('destinations');
destinationXml.collect('destination');
destinationXml.on('endElement: destinations', function(item) {
    var destinationsList = item;
    console.log(destinationsList)


});