// angular.module('pocApp').config(function($routeSegmentProvider, $routeProvider) {  
//     $routeSegmentProvider
//         .when('/demo/:masterTableName','demo')
//         .when('/tree/:masterTableName','tree')
//         .when('/demoNew', 'demoNew')
//         .segment('demo', {templateUrl: 'modules/views/demo/list.html'})
//         .segment('tree', {templateUrl: 'modules/views/tree/list.html'})
//         .segment('demoNew', {templateUrl: 'modules/views/demo/new.html'})
//         .up()
// }) ;          

pocApp.config(function($stateProvider) {
  var demoState = {
    name: 'demo',
    url: '/demo/:masterTableName',
    templateUrl: 'modules/views/demo/list.html'
  }

  var treeState = {
    name: 'tree',
    url: '/tree/:masterTableName',
    templateUrl: 'modules/views/tree/list.html'
  }

  var bootstrap = {
    name: 'bootstrap',
    url: '/bootstrap',
    templateUrl: 'modules/views/showcase/bootstrap.html'
  }

  $stateProvider.state(demoState);
  $stateProvider.state(treeState);
  $stateProvider.state(bootstrap);
});
