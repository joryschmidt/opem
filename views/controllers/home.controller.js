angular.module('opem')

.controller('homeCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.event = {};
  
  $http.get('/user').then(function(q) {
    $scope.user = q.data;
  }, function(response) {
    $location.path('/login');
  });
  
  $scope.logout = function() {
    $http.get('/logout').then(function(response) {
      delete $scope.user;
      window.location.href = '/#!/login';
      console.log('logged out');
    }, function() {
      console.log("couldn't log out");
    });
  };
  
  $scope.submit = function() {
    
  };
}]);