(function() {
  var app = angular.module('opem', ['ngRoute']);
  app.config(['$routeProvider', '$locationProvider', '$rootScopeProvider', function($routeProvider, $locationProvider, $rootScopeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .otherwise({ redirectTo: '/' });
  }]);
})();