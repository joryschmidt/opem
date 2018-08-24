angular.module('opem')

.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.submit = function() {
    $http.post('/login', $scope.user).then(function(response) {
      $location.path('/dashboard');
    }, function(response) {
      if (response.statusText == "Unauthorized") {
        console.log('Wrong password');
      }
    });
  }
  
  $http.get('/user').then(function() {
    
  }, function() {
    window.location.href = '/login';
  });
}])

.controller('signupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.user = {};
  
  $scope.submit = function() {
    $http.post('/signup', $scope.user).then(function(response) {
      $location.path('/login');
    }, function(response) {
      console.log(response);
    });
  }
}]);