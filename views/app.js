(function() {
  var app = angular.module('opem', ['ngRoute']);
  
  app.config(['$routeProvider', '$locationProvider', '$rootScopeProvider', function($routeProvider, $locationProvider, $rootScopeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/error', {
        templateUrl: 'templates/error.html'
      })
      .otherwise({ redirectTo: '/error' });
  }]);
  
  app.factory('hasRootUser', ['$rootScope', function($rootScope) {
    console.log($rootScope);
    return { check: !!$rootScope.rootUser };
  }]);
  
  app.directive('popup', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/_popup.html'
    }
  });
  
  app.run(['$http', function($http) {
    $http.get('user').then(function() {
      
    }, function() {
      window.location.href = '/login';
    });
  }]);
  
})();
