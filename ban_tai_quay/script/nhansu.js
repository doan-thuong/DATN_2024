window.nhansuCtrl = function ($scope, $http) {
    const url = "http://localhost:8080/getAll"

    $scope.ds = []
    $http.get(url).then(function (response) {
        $scope.ds = response.data
    })
}