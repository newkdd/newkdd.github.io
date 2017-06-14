/**
 * 首页控制器
 *
 */
angular.module('pocApp').controller("indexController", ["$scope", "$http", "$window", "$location", function($scope, $http, $window, $location) {

}]);

/**
 * 基础控制器
 * 
 */
pocApp.controller("baseController", ["$scope", "$http", "$stateParams", "$location", "dataTableService",
    function($scope, $http, $stateParams, $location, dataTableService) {

        if ($stateParams.masterTableName != null) {
            $scope.masterTableName = $stateParams.masterTableName;
            dataTableService.loadTable($scope);
            $scope.gridOptions.data = [];
        }


        $scope.fnSearchMaster = function() {
            $http.post("data/" + $scope.masterTableName + "List.json").then(handleSearch);
        }

        var handleSearch = function(data, status) {
            $scope.gridOptions.data = data.data;
        };

        $scope.editRow = function(id, buttonId, data) {
            $scope.editData = {};
            var requestBody = { id: id };
            $scope.editData = eval('(' + data + ')');
            $("#" + buttonId).click();
            // $http.post("forms/data/"+$scope.masterTableName+"Detail.json", requestBody).success(function(data, status){
            //  //如果是数组，就取第一个，如果后台请求的方法返回的是一个实体对象，则直接   $scope.editData=data
            //  $scope.editData=data[0];
            //  $("#"+buttonId).click();
            // });
        };
    }
]);
