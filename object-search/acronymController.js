app.controller('acronymCtrl', function($scope, $http) {

  $http.get("data.json")

  .success(function(data){
    $scope.myData = data ;
  });
  
  $scope.findValue = function(enteredValue) {     
    angular.forEach($scope.myData.Postcode, function(value, key) {
      if (key === enteredValue) {
        $scope.results = [];
        $scope.results.push({postcode: key, owner: value[0].location});
      }
    });
  };
});