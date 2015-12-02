'use strict';

var _ = require('lodash');

function XMLTOJSON() {

}

function _parseXML(uglyData, name, res) {

    if (!res) {
        res = [];
    }
    if (uglyData) {

        if (uglyData.length > 0) {

            for (var i = 0; i < uglyData.length; i++) {
                _parseXML(uglyData[i], name, res);
            }


        } else if (uglyData[name]) {
            res.push(uglyData[name])
        }
    }

    return res;

}


/**
 * Convert taxonomies to JSON *
 * @param taxonomiesList
 * @param result
 * @returns {*}
 */
XMLTOJSON.prototype.taxonomiesToJson = function (taxonomiesList, result) {
    if (!result) {
        result = [];
    }
    for (let i = 0; i < taxonomiesList.length; i++) {
        let taxonomie = taxonomiesList[i];

        if (taxonomie.$) {
            let infos = {}, id = taxonomie.$.atlas_node_id;
            infos[id] = {
                id: taxonomie.$.atlas_node_id,
                geoId: taxonomie.$.geo_id,
                name: taxonomie.node_name[0],
                ethyl_content_object_id: taxonomie.$.ethyl_content_object_id
            };
            result.push(infos);
        }
        if (taxonomie && taxonomie.node && taxonomie.node.length > 0) {
            result = this.taxonomiesToJson(taxonomie.node, result);

        }

    }
    return result;

};


/**
 * Convert destination to JSON*
 * @param destinationsList
 * @returns {Array}
 */
XMLTOJSON.prototype.destinationToJson = function *(destinationsList) {
    console.log("INNN");
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

        if (destination.history) {
            var result = _parseXML(destination.history, 'history');

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
        };


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
        }


        var transport = {
            getting_around: getting_around,
            getting_there_and_away: getting_there_and_away
        };


        if (whenToGo) {
            when_to_go = {
                overview: whenToGo.overview,
                climate: whenToGo.climate
            }
        }


        var weather = {
            when_to_go: when_to_go
        };

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
        };

        destinations.push(destinationData);

    }

    return destinations

};


module.exports = XMLTOJSON;