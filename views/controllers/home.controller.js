angular.module('opem')

.controller('homeCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.event = {};
  
  $http.get('/user').then(function(q) {
    $scope.user = q.data;
  }, function(response) {
    console.log('Sorry bub, but you have to sign up to see that page');
    window.location.href = '/login';
  });
  
  $scope.logout = function() {
    $http.get('/logout').then(function(response) {
      delete $scope.user;
      window.location.href = '/login';
      console.log('logged out');
    }, function() {
      console.log("couldn't log out");
    });
  };
  
  $scope.submit = function() {
    
  };
}]);