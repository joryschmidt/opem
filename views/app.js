(function() {
  var app = angular.module('opem', ['ngRoute']);
  
  app.config(['$routeProvider', '$locationProvider', '$rootScopeProvider', function($routeProvider, $locationProvider, $rootScopeProvider) {
    $routeProvider
      .when('/', {
        template: '<span>Redirecting...</span>',
        controller: 'redirect'
      })
      .when('/dashboard', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/hosted', {
        templateUrl: 'templates/events.html',
        controller: 'hostedCtrl'
      })
      .when('/error', {
        templateUrl: 'templates/error.html'
      })
      .otherwise({ redirectTo: '/' });
  }]);
  
  app.factory('hasRootUser', ['$rootScope', function($rootScope) {
    console.log($rootScope);
    return { check: !!$rootScope.rootUser };
  }]);
  
  app.directive('popup', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/_popup.html'
    }
  });
  
  app.directive('eventCard', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/partials/_event-card.html'
    }
  });
  
  // redirects user to dashboard if logged in, to the login page otherwise
  app.controller('redirect', ['$http', function($http) {
    $http.get('/user').then(function() {
      window.location.href = '/#!/dashboard'
    }, function() {
      window.location.href = '/login';
    });
  }]);
  
  // app.run(['$http', function($http) {
  //   $http.get('/user').then(function(user) {
      
  //   }, function() {
  //     window.location.href = '/login';
  //   });
  // }]);
  
})();
