angular.module('destinationApp', ['ngMaterial', 'hm.readmore'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider
            .theme('docs-dark', 'default')
            .primaryPalette('grey')
            .accentPalette('pink')
            .warnPalette('red')
            .dark();


    })


    .controller('MainCtrl', function ($scope, $http) {


        console.log("START");
        $http.get('data/destination.json').success(function (data) {
            $scope.name = data.name;
            $scope.id = data.id;
            $scope.histories = data.history;

            for (var i = 0; i < data.history.length; i++) {
                $scope.history += '\n' + data.history[i];

            }

            data
            $scope.before_you_go = data.practical_information.health_and_safety.before_you_go[0];
            $scope.dangers_and_annoyances = data.practical_information.health_and_safety.dangers_and_annoyances[0];
            $scope.in_transit = data.practical_information.health_and_safety.in_transit[0];
            $scope.while_youre_there = data.practical_information.health_and_safety.while_youre_there[0];


            $scope.limit = 900;
            $scope.lessText = "Read less";
            $scope.moreText = "Read more";
            $scope.dotsClass = "toggle-dots-grey";
            $scope.linkClass = "toggle-link-yellow";


            $scope.tab = 'home';
            $scope.selectTab = function (setTab) {
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
;