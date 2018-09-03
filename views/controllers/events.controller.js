angular.module('opem')

.controller('hostedCtrl', ['$http', '$scope', function($http, $scope) {
  
  $http.get('/user').then(function(q) {
    $scope.user = q.data
    
    $http.get('/event/hosted/' + $scope.user._id).then(function(q) {
      var events = q.data;
      var date_options = {
        // weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      
      var time_options = {
        hour: 'numeric'
      }
      
      events.forEach(function(e) {
        var date = new Date(e.date);
        e.calendar = date.toLocaleDateString('en-US', date_options);
        
        var start = new Date(e.time_start);
        e.start = start.toLocaleTimeString('en-US', time_options);
        
        if (e.time_end) {
          var end = new Date(e.time_end);
          e.end = end.toLocaleTimeString('en-US', time_options);
        }
        
        var until = Date.parse(e.date) - Date.now();
        
        if (until > 0) e.remaining = Math.floor(until / 86400000);
        
        e.spots_left = e.spots - e.attendees.length;
      });
      
      $scope.events = events;
    });
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
}]);