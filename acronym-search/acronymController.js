app.controller('acronymCtrl', function($scope, $http) {
    $http.get("data.json")
    .success(function(response) {$scope.acronyms = response.records;});
    $scope.filterKeywordsLength = 5;

    $scope.viewMoreResults = function() {

    };

});