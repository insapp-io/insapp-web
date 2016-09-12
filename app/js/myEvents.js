app.controller('MyEvents', ['$scope', '$resource', '$location', 'Session', function($scope, $resource, $location, Session) {
  var Association = $resource('https://api.thomasmorel.io/association/:id?token=:token');
  var Event = $resource('https://api.thomasmorel.io/event/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };


  Association.get({id:Session.getAssociation(), token:Session.getToken()}, function(assos) {
    $scope.myEvents = []
    assos.events = (assos.events == null ? [] : assos.events)
    for (eventID of assos.events){
      Event.get({id:eventID, token:Session.getToken()}, function(event) {
        event.nbParticipant = (event.participants != null ? event.participants.length : 0)
        $scope.myEvents.push(event)
      });
    }
  }, function(error) {
      Session.destroyCredentials()
      $location.path('/login')
  });

  $scope.onclick = function(event) {
      $location.path('/myEvents/' + event.ID)
   };

}]);
