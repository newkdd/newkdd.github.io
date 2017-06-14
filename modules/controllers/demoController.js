angular.module('pocApp').controller("demoController", ["$scope", "$http", "$routeParams", "$location", "$document",
    function($scope, $http, $routeParams, $location, $document) {

        $scope.demoNew = function() {
            $location.path('/demoNew');
        };

    }
]).value('duScrollOffset', 30);

angular.module('pocApp').controller("treeController", ["$scope", "$http", "$routeParams", "$location",
    function($scope, $http, $routeParams, $location) {

        $scope.statuses = [{ "statusName": "Active", "statusId": "1" }, { "statusName": "Inactive", "statusId": "0" }];

        $scope.demoNew = function() {
            $location.path('/demoNew');
        };


        $scope.fnSearchMaster1 = function() {
            $http.post("data/" + $scope.masterTableName + "List.json").then(handleSearch1);
        }

        var handleSearch1 = function(data, status) {

            var data = data.data;

            for (var i = 0; i < data.length; i++) {
                data[i].state = data[i].address.state;
                data[i].balance = Number(data[i].balance.slice(1).replace(/,/, ''));
            }
            data[0].$$treeLevel = 0;
            data[1].$$treeLevel = 1;
            data[10].$$treeLevel = 1;
            data[11].$$treeLevel = 1;
            data[20].$$treeLevel = 0;
            data[25].$$treeLevel = 1;
            data[50].$$treeLevel = 0;
            data[51].$$treeLevel = 0;
            $scope.gridOptions.data = data;
        };


        $scope.initProcess = function() {
            debugger;
            $("#myScrollspy").scrollspy();
            $('#myScrollspy').on('activate.bs.scrollspy', function(data) {
                var total = $("#nav-test").children("li").size();
                var current = data.target.childElementCount;
                $("#nav-test").children("li").each(function(index, item) {
                    if ($(this).hasClass("active")) {
                        current = index + 1;
                        return;
                    }
                });
                $("#nav-test").children("li").each(function(index, item) {
                    $("#progress").css("width", current / total * 100 + "%");
                    $("#progress").html(current / total * 100 + "%");
                });
            })
        };

    }
]);

pocApp.controller("bootstrapController", ["$scope", "$http", "$location",
    function($scope, $http, $location) {
        /**时间选择控件*/
        $scope.dat = new Date();
        $scope.format = "yyyy/MM/dd";
        $scope.altInputFormats = ['yyyy/M!/d!'];

        $scope.popup1 = {
            opened: false
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        /**选择框*/

    }
]);
