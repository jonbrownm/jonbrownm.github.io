app.controller('acronymCtrl', function($scope, $http) {
    $http.get("data.json")
    .success(function(response) {$scope.acronyms = response.records;});
});