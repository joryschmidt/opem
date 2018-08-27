angular.module('opem')

.controller('homeCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  
  $scope.event = {};
  
  $http.get('/user').then(function(q) {
    var user = q.data;
    console.log(user);
    $scope.user = user;
    $scope.event.host = user._id;
    
    // this makes the notification show up
    if (user.hosted_events.length > 0) {
      jQuery('#hosted-notification').css('display', 'flex');
      document.getElementById('hosted-notification').innerText = user.hosted_events.length.toString();
    }
    
    
    
    
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
    $http.post('/event', $scope.event).then(function(response) {
      console.log('event has been created');
      $scope.event = {};
      // Closes the popup if it was successfully saved
      jQuery('#popup2').css({ visibility: 'hidden', opacity: 0 });
    }, function(err) {
      console.log(err);
      console.log('there was some frontend error creating the event');
    });
  };
  
}]);