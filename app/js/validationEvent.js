app.controller('ValidationEvent', ['$scope', '$resource', '$location', 'Session', function($scope, $resource, $location, Session) {
  var MyAssociations = $resource('https://api.thomasmorel.io/association/:id/myassociations?token=:token');
  var Association = $resource('https://api.thomasmorel.io/association/:id?token=:token');
  var Event = $resource('https://api.thomasmorel.io/event/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };

  $scope.myEvents = []

  MyAssociations.query({id:Session.getAssociation(), token:Session.getToken()}, function(assosId) {
    for (assoId of assosId){
      Association.get({id:assoId, token:Session.getToken()}, function(association){
        var events = (association.events != null ? association.events : [])
        for (eventId of events){
          Event.get({id:eventId, token:Session.getToken()}, function(event){
            event.nbParticipant = (event.participants != null ? event.participants.length : 0)
            event.associationName = association.name
            $scope.myEvents.push(event)
          });
        }
      });
    }
  }, function(error) {
      $location.path('/login')
  });

  $scope.onclick = function(event) {
      $location.path('/myEvents/' + event.ID)
   };

}]);
