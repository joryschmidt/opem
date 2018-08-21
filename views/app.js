(function() {
  var app = angular.module('opem', ['ngRoute']);
  
  app.config(['$routeProvider', '$locationProvider', '$rootScopeProvider', function($routeProvider, $locationProvider, $rootScopeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })
      .when('/signup', {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })
      .otherwise({ redirectTo: '/login' });
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
})();
