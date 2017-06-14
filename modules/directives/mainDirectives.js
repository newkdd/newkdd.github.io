/**
* 自定义组件，弹出框
* 使用方法：<linked-modal />
*/
angular.module("pocApp").directive('linkedModal', function() {
	return {
		restrict: 'E',
		templateUrl: 'modules/templates/modal/linked-modal.html'
	};
});

/**
* 自定义组件，富文本
* 使用方法：<textarea demo-text-editor data-ng-model="editData.template"></textarea>
*/
pocApp.directive('demoTextEditor', [function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0]);
            CKEDITOR.config.language = "en";
            if (!ngModel) {
                return;
            }
          
            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}]);

pocApp.directive("uiSelectModal",[function(){
    return {
        restrict: 'AE',
        template: '<input type="text" class="form-control" ng-model="$ctrl.selected.reportNo"/> <span class="input-group-btn"><button type="button" ng-click="$ctrl.open()" class="btn btn-default" ><i class="glyphicon glyphicon-search"></i></button></span>'
        ,
        link:function($scope,elm,attr,controller){
            debugger;
          console.log("这是link");
        },
        controller:function($scope,$element,$attrs){
          console.log("这是con");
        }
    };
}]);


