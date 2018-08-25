angular.module('opem')

.controller('hostedCtrl', ['$http', '$scope', function($http, $scope) {
  
  $http.get('/user').then(function(q) {
    $scope.user = q.data
    
  });
  
  
}]);