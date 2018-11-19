angular.module('opem')

.controller('eventCtrl', ['$scope', '$http', '$routeParams', 'eventCardService', function($scope, $http, $routeParams, eventCardService) {
  var id = $routeParams.id;
  
  $http.get('/event/' + id).then(function(query) {
    console.log(query.data);
    $scope.event = eventCardService.format([query.data])[0];
  }, function() {
    console.log('event retrieval failed');
  });
}]);