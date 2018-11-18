angular.module('opem')

.controller('resultsCtrl', ['$scope', 'search', 'eventCardService', function($scope, search, eventCardService) {
  $scope.search_results = eventCardService.format(search.getResults());
}]);





// ADD LOGIC TO CALCULATE SPOTS REMAINING FOR RESULTS VIEW