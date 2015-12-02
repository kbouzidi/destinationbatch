/**
 * Created by khalil on 30/11/15.
 */


'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('APP');
var toArray = require('stream-to-array')
var _ = require('lodash');

var fs = require('fs');
var XmlStream = require('xml-stream');
var xml2js = require('xml2js');

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

/*  var destinationList = [];
var processDocument = function(item) {
    // Collect document properties
 //console.log(destinationList)

    if (item){
        if (!destinationList[item.$name]){
            destinationList[item.$name]= [item.$text];
        } else {
            destinationList[item.$name].push(item.$text)
        }
    }

    console.log(destinationList.length)

   
};

 
destinationXml.on('updateElement: destination history', processDocument);
//destinationXml.on('updateElement: history', processDocument);*/

function _getDataFromParser(uglyData, name, res) {

    if (!res) {
        res = [];
    }
    if (uglyData) {

        if (uglyData.length > 0) {
            for (var i = 0; i < uglyData.length; i++) {
                // console.log(uglyData[i])
                _getDataFromParser(uglyData[i], name, res);
            };

        } else if (uglyData[name]) {
            res.push(uglyData[name])
        }
    }



    return res;

}

function _creatDestinationData(destinationsList) {
    var destinations = [];
    for (var i = 0; i < destinationsList.length; i++) {
        let destinationData = {};
        let destination = destinationsList[i];
        var overview, history = [],
            introductory = {},
            health_and_safety = {},
            money_and_costs = {},
            getting_around = {},
            getting_there_and_away = {},
            when_to_go = {},
            work = {};


        let gettingAround = _.get(destination, 'transport[0].getting_around[0]', undefined);
        let gettingThere = _.get(destination, 'transport[0].getting_there_and_away[0]', undefined);
        let health_safety = _.get(destination, 'practical_information[0].health_and_safety[0]', undefined);
        let moneyCost = _.get(destination, 'practical_information[0].money_and_costs[0]', undefined);
        let visas = _.get(destination, 'practical_information[0].visas[0].overview', undefined);
        let whenToGo = _.get(destination, 'weather[0].when_to_go[0]', undefined);
        let workLive = _.get(destination, 'work_live_study[0].work[0]', undefined);

        //console.log(destination.history);
        if (destination.history) {
            var result = _getDataFromParser(destination.history, 'history');

            history = result[0][0]['history'];

            if (result[0][0]['overview']) {
                let overview = result[0][0]['overview']
            }
        }

        introductory.introduction = {
            overview: _.get(destination, 'introductory[0].introduction[0].overview', undefined)
        };

        if (health_safety) {
            health_and_safety = {
                before_you_go: health_safety.before_you_go,
                dangers_and_annoyances: health_safety.dangers_and_annoyances,
                in_transit: health_safety.in_transit,
                while_youre_there: health_safety.while_youre_there,
            }
        }

        if (moneyCost) {
            money_and_costs = {
                cost: moneyCost.costs,
                money: moneyCost.money
            }
        }


        var practical_information = {
            health_and_safety: health_and_safety,
            money_and_costs: money_and_costs,
            visas: visas
        }


        if (gettingAround) {
            getting_around = {
                overview: gettingAround.overview,
                air: gettingAround.air,
                bicycle: gettingAround.bicycle,
                car_and_motorcycle: gettingAround.car_and_motorcycle,
                local_transport: gettingAround.local_transport,
                train: gettingAround.train,
            }
        }


        if (gettingThere) {
            getting_there_and_away.air = gettingThere.air
        };

        var transport = {
            getting_around: getting_around,
            getting_there_and_away: getting_there_and_away
        }


        if (whenToGo) {
            when_to_go = {
                overview: whenToGo.overview,
                climate: whenToGo.climate
            }
        }


        var weather = {
            when_to_go: when_to_go
        }

        if (workLive) {
            work = {
                overview: workLive.overview,
                business: workLive.business
            }
        }


        var work_live_study = {
            work: work
        };

        destinationData = {
            id: destination.$.atlas_id,
            name: destination.$.title,
            overview: overview,
            history: history,
            introductory: introductory,
            practical_information: practical_information,
            transport: transport,
            weather: weather,
            work_live_study: work_live_study
        }

        console.log(destinationData.name);
        destinations.push(destinationData);

    }

    return destinations

}

toArray(destinationStream, function(err, arr) {
    if (err) return console.log(err.message)

    var content = Buffer.concat(arr)
    var parser = new xml2js.Parser();
    parser.parseString(content, function(err, res) {
        if (err) return console.log(err.message)

        var dest = _creatDestinationData(res.destinations.destination);

        console.log(dest.length);
    })
})