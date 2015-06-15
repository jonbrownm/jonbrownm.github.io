app.controller('randomCtrl', function($scope, $http) {

    $http.get("data.json")

    .success(function(response) {
    	$scope.book = response.catalogue;

    	angular.forEach($scope.book, function(item,i) {
    		
    		random = Math.floor(Math.random() * item.length);
    		
    		length = $scope.book[i].length;

    		$scope["_" + i] = ($scope.book[i][random])

	   });

    });

});


