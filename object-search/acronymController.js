app.controller('acronymCtrl', function($scope, $http) {

  $http.get("data.json")

  .success(function(data){
    $scope.myData = data ;
  });
  
  $scope.findValue = function(enteredValue) {     
    angular.forEach($scope.myData.Postcode, function(value, key) {

      enteredValue = enteredValue.replace(" ",""); 
      enteredValue = enteredValue.toUpperCase();

      if (key.indexOf(enteredValue) >= 0) {
        $scope.results = [];
        $scope.results.push({postcode: key, business: value[0].business, url: value[0].url});
      }
    });
  };
});