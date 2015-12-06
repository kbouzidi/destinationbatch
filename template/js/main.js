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
                        $scope.history += '\n' + _.get(data, 'overview', null);
                    }

                    if (data.overview) {
                        $scope.history += '\n' + _.get(data, 'introductory.introduction.overview', null)
                    }

                } else if (data.overview) {

                    $scope.history += '\n' + data.overview
                } else if (data.introductory) {

                    $scope.history += '\n' + _.get(data, 'introductory.introduction.overview', null);
                }

            }


            var result = [];
            for (var key in data) {
                if (key == 'practical_information') {

                    $scope.before_you_go = _.get(data, 'practical_information.health_and_safety.before_you_go', null);
                    $scope.in_transit = _.get(data, 'practical_information.health_and_safety.in_transit', null);
                    $scope.dangers_and_annoyances = _.get(data, 'practical_information.health_and_safety.dangers_and_annoyances', null);
                    $scope.visas = _.get(data, 'practical_information.visas', null);
                    $scope.while_youre_there = _.get(data, 'practical_information.health_and_safety.while_youre_there', null);


                    $scope.cost = _.get(data, 'practical_information.money_and_costs.cost', null);
                    $scope.money = _.get(data, 'practical_information.money_and_costs.money', null);
                    if ($scope.cost || $scope.money) {
                        $scope.money_and_costsShow = true;

                    }
                    if ($scope.before_you_go ||
                        data.dangers_and_annoyances ||
                        data.visas ||
                        data.while_youre_there ||
                        data.cost ||
                        data.money) {
                        $scope.practical_informationShow = true;
                        $scope.practical_informationMenu = true;
                    }


                }


                if (key == 'transport') {

                    $scope.overviewTransport = _.get(data, 'transport.getting_around.overview', null);
                    $scope.air = _.get(data, 'transport.getting_around.air', null);
                    $scope.bicycle = _.get(data, 'transport.getting_around.bicycle', null);
                    $scope.car_and_motorcycle = _.get(data, 'transport.getting_around.car_and_motorcycle', null);
                    $scope.local_transport = _.get(data, 'transport.getting_around.local_transport', null);
                    $scope.train = _.get(data, 'transport.getting_around.train', null);
                    $scope.gettingThere = _.get(data, 'transport.getting_there_and_away.air', null);

                    if ($scope.overviewTransport ||
                        $scope.air ||
                        $scope.bicycle ||
                        $scope.car_and_motorcycle ||
                        $scope.local_transport ||
                        $scope.train ||
                        $scope.gettingThere) {

                       // $scope.transportShow = true;
                        $scope.transportMenu = true;
                    }
                }


                if (key == 'weather') {
                    if (data.weather.when_to_go) {
                        $scope.overviewWeather = _.get(data, 'weather.when_to_go.overview', null);
                        $scope.climate = _.get(data, 'weather.when_to_go.climate', null);
                        if ($scope.overviewWeather ||
                            $scope.climate) {
                            $scope.when_to_goShow = true;
                            $scope.when_to_goMenu = true;

                        }
                    }


                }
                if (key == 'work_live_study') {
                    if (data.work_live_study.work) {

                        $scope.overviewWork = _.get(data, 'work_live_study.work.overview', null);
                        $scope.business = _.get(data, 'work_live_study.work.business', null);

                        if ($scope.overviewWork ||
                            $scope.business) {
                            $scope.workShow = true;
                            $scope.workMenu = true;

                        }

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
                    $scope.home = true;
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
        var _ = $window._;
        delete( $window._ );
        return( _ );
    }
)
;