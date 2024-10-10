window.notifiCtrl = function ($scope) {
    $scope.list = new Array(10); // Danh sách 10 thông báo

    // Tạo một mảng để theo dõi trạng thái ẩn/hiện của chi tiết mỗi thông báo
    $scope.showDetail = new Array(10).fill(false);

    // Hàm để bật/tắt hiển thị chi tiết nội dung
    $scope.toggleDetail = function (index) {
        $scope.showDetail[index] = !$scope.showDetail[index];
    };
}