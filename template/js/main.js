angular.module('destinationApp', ['ngMaterial', 'hm.readmore'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider
            .theme('docs-dark', 'default')
            .primaryPalette('grey')
            .accentPalette('pink')
            .warnPalette('red')
            .dark();


    })


    .controller('MainCtrl', function ($scope, $http, _) {


        console.log("START");
        $http.get('data/destination.json').success(function (data) {
            $scope.name = data.name;
            $scope.id = data.id;

            if (data.history || data.overview || data.introductory) {
                $scope.home = true;
                $scope.homeMenu = true;
                if (_.get(data, 'history', null)) {
                    $scope.histories = data.history;
                    for (var i = 0; i < data.history.length; i++) {
                        $scope.history += '\n' + data.history[i];

                    }

                    if (data.overview) {
                        $scope.history += '\n' + data.overview[0]
                    }

                    if (data.overview) {
                        $scope.history += '\n' + data.introductory.introduction.overview[0]
                    }

                } else if (data.overview) {

                    $scope.history += '\n' + data.overview[0]
                } else if (data.overview) {

                    $scope.history += '\n' + data.introductory.introduction.overview[0]
                }

            }


            var result = [];
            for (var key in data) {
                if (key == 'practical_information') {
                    $scope.practical_informationShow = true;
                    $scope.practical_informationMenu = true;

                    if (data.practical_information &&
                        data.practical_information.health_and_safety &&
                        data.practical_information.health_and_safety.before_you_go
                        && data.practical_information.health_and_safety.before_you_go[0]) {
                        $scope.before_you_go = data.practical_information.health_and_safety.before_you_go[0];

                    }
                    if (data.practical_information &&
                        data.practical_information.health_and_safety &&
                        data.practical_information.health_and_safety.before_you_go
                        && data.practical_information.health_and_safety.before_you_go [0]) {
                        $scope.dangers_and_annoyances = data.practical_information.health_and_safety.dangers_and_annoyances[0];

                    }
                    if (data.practical_information &&
                        data.practical_information.health_and_safety &&
                        data.practical_information.health_and_safety.before_you_go
                        && data.practical_information.health_and_safety.before_you_go[0]) {
                        $scope.while_youre_there = data.practical_information.health_and_safety.while_youre_there[0];

                    }
                    if (data.practical_information &&
                        data.practical_information.health_and_safety &&
                        data.practical_information.health_and_safety.before_you_go &&
                        data.practical_information.health_and_safety.before_you_go[0]) {
                        $scope.visas = data.practical_information.visas[0];

                    }


                    if (data.practical_information && data.practical_information.money_and_costs && data.practical_information.money_and_costs.cost) {

                        $scope.cost = _.get(data, 'practical_information.money_and_costs.cost[0]', null);
                        $scope.money = _.get(data, 'practical_information.money_and_costs.money[0]', null);
                        if ($scope.cost || $scope.money) {
                            $scope.money_and_costsShow = true;

                        }

                    }

                }


                if (key == 'transport') {
                    $scope.transportShow = true;
                    $scope.transportMenu = true;
                    $scope.overviewTransport = data.transport.getting_around.overview[0];
                    $scope.air = data.transport.getting_around.air[0];
                    $scope.bicycle = data.transport.getting_around.bicycle[0];
                    $scope.car_and_motorcycle = data.transport.getting_around.car_and_motorcycle[0];
                    $scope.local_transport = data.transport.getting_around.local_transport[0];
                    $scope.train = data.transport.getting_around.train[0];
                    $scope.gettingThere = data.transport.getting_there_and_away.air[0];
                }


                if (key == 'weather') {
                    if (data.weather.when_to_go) {
                        $scope.when_to_goShow = true;
                        $scope.when_to_goMenu = true;
                        $scope.overviewWeather = data.weather.when_to_go.overview[0];
                        $scope.climate = data.weather.when_to_go.climate[0];

                    }


                }
                if (key == 'work_live_study') {
                    if (data.work_live_study.work) {
                        $scope.workShow = true;
                        $scope.workMenu = true;
                        $scope.overviewWork = data.work_live_study.work.overview[0];
                        $scope.business = data.work_live_study.work.business[0];

                    }


                }
            }


            $scope.keys = result;


            $scope.limit = 900;
            $scope.lessText = "Read less";
            $scope.moreText = "Read more";
            $scope.dotsClass = "toggle-dots-grey";
            $scope.linkClass = "toggle-link-yellow";

            var getSectionOff = function () {
                $scope.home = false;
                $scope.workShow = false;
                $scope.when_to_goShow = false;
                $scope.transportShow = false;
                $scope.practical_informationShow = false;
                $scope.money_and_costsShow = true;

            };

            $scope.tab = 'home';
            $scope.selectTab = function (setTab) {
                if (setTab === 'home') {
                    $scope.workShow = true;
                    $scope.when_to_goShow = true;
                    $scope.transportShow = true;
                    $scope.practical_informationShow = true;

                } else if (setTab === 'practical_information') {
                    getSectionOff();
                    $scope.practical_informationShow = true;

                }
                $scope.tab = setTab;
                console.log($scope.tab);
            };

            $scope.isSelected = function (checkTab) {
                return $scope.tab === checkTab;
            };

            console.log(data);
        }).error(function (err) {
            $scope.error = err;
        });

    })

    .run(
    function (_) {

    })
    .factory(
    "_",
    function ($window) {

        // Introduction of loadsh 
        // Copyright 
        // This code was intentianly copied to quickly integrate loadsh 
        // source http://www.bennadel.com/blog/2720-creating-and-extending-a-lodash-underscore-service-in-angularjs.htm
        // Get a local handle on the global lodash reference.
        var _ = $window._;

        delete( $window._ );

        _.naturalList = function (collection) {
            if (collection.length > 2) {
                var head = collection.slice(0, -1);
                var tail = collection[ collection.length - 1 ];
                return( head.join(", ") + ", and " + tail );
            }
            if (collection.length === 2) {
                return( collection.join(" and ") );
            }
            if (collection.length) {
                return( collection[ 0 ] );
            }
            return( "" );
        };

        return( _ );
    }
)
;