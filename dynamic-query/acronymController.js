app.controller('acronymCtrl', function($http, $scope, $location) {

	$http.get("data.json")
    .success(function(response) {$scope.products = response.records;});

	if($location.search().telephone && $location.search().product1) {

		$scope.telephone = $location.search().telephone;
		$scope.product1 = $location.search().product1;

	}

})