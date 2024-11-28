import * as evalService from './service/evaluate_service.js'

window.evaluateCtrl = function ($scope) {

    $scope.star = 0

    evalService.handleControlMenuClick()

    $scope.takeEvaluate = function () {
        evalService.showPopupEvaluate(result => {
            $scope.$apply(() => { $scope.star = result })
        })
        evalService.eventStarEvaluate(index => {
            $scope.$apply(() => { $scope.star = index })
        })
    }
}