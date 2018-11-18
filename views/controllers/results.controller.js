angular.module('opem')

.controller('resultsCtrl', ['$scope', 'search', function($scope, search) {
  $scope.search_results = search.getResults();
}]);