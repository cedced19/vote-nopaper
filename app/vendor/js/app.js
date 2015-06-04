angular.module('VoteNoPaper', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $.material.init();
        $routeProvider
        .when('/', {
            templateUrl: 'vendor/views/vote.html',
            controller: 'VoteNoPaperVoteCtrl'
        })
        .when('/admin', {
            templateUrl: 'vendor/views/admin.html',
            controller: 'VoteNoPaperAdminCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
.directive('green', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).on('click', function() {
                $(element).addClass('green');
                setTimeout(function () {
                    $(element).removeClass('green');
                }, 1000);
            });
        }
    };
})
.controller('VoteNoPaperVoteCtrl', ['$scope', function ($scope) {
        $scope.items = filesystem.get();
        $scope.increments = function (item) {
             angular.forEach($scope.items, function(value, key) {
                if (value.name == item.name) {
                    $scope.items[key].count++;
                    filesystem.set($scope.items);
                }
             });
        };
}])
.controller('VoteNoPaperAdminCtrl', ['$scope', function($scope) {
    $scope.items = filesystem.get();
    $scope.add = function () {
        if ($scope.new != '') {
            $scope.items.push({name: $scope.new, count: 0});
            filesystem.set($scope.items); 
        }
    };
    $scope.remove = function (item) {
             angular.forEach($scope.items, function(value, key) {
                if (value.name == item.name) {
                    if (key > -1) {
                        $scope.items.splice(key, 1);
                    }
                    filesystem.set($scope.items);
                }
            });
    };
    $scope.removeFile = function () {
        filesystem.remove();
    }; 
}]);