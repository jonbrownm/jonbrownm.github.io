app.controller('objectsearchCtrl', function($scope, $http) {

  $http.get("data.json")

  .success(function(data){
    $scope.myData = data ;
  });
  
  $scope.findValue = function(enteredValue) {

    enteredValue = enteredValue.replace(/\s/g, "");
    enteredValue = enteredValue.toUpperCase();

    var regex = /[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]?[0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/i;
    isPostcode = regex.test(enteredValue);

    outwardCode = enteredValue.slice(0, -3);

    angular.forEach($scope.myData.Postcode, function(value, key) {

      if (isPostcode == true && key === outwardCode) {
        $scope.results = [];
        $scope.results.push({postcode: key, business: value[0].business, url: value[0].url});

        // window.location.href = value[0].url;

      }

    });

  };

});