function AppCtrl($scope) {

    $scope.$watch('url', function () {
        $scope.parser.href = $scope.url;
    });

    $scope.init = function () {
        $scope.parser = document.createElement('a');
        $scope.url = window.location;
    }

}