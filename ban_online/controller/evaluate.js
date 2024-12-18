import * as evalService from './service/evaluate_service.js'

window.evaluateCtrl = function ($scope) {

    $scope.star = 0
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (!user) {
        window.location.href = 'http://127.0.0.1:5501/ban_online/layout.html#!/home'
    }

    let idClient = user.id
    const postEval = document.querySelector('.post-result-avaluate')

    evalService.handleControlMenuClick(idClient, (noDone) => {
        $scope.$apply(() => {
            $scope.listNoDone = noDone
        })
    },
        (done) => {
            $scope.$apply(() => {
                $scope.listDone = done
            })
        })

    evalService.getEvaluateNoDone(idClient)
        .then(response => {
            $scope.$apply(() => {
                $scope.listNoDone = response
            })
        })

    $scope.takeEvaluate = function (idEval) {
        $scope.detailEval = $scope.listNoDone.filter(function (ele) {
            return ele.id == idEval;
        })[0]
        evalService.showPopupEvaluate(result => {
            $scope.$apply(() => {
                $scope.star = result
            })
        })
        evalService.eventStarEvaluate(index => {
            $scope.$apply(() => {
                $scope.star = index
            })
        })

        postEval.addEventListener('click', () => {
            evalService.getDataEvaluate(idEval, resp => {
                $scope.$apply(() => {
                    $scope.listNoDone = resp
                })
            })
        })
    }
}