app.controller('ValidationEvent', ['$scope', '$resource', '$location', 'session', 'configuration', function($scope, $resource, $location, session, configuration) {
  var MyAssociations = $resource(configuration.api + '/associations/:id/myassociations');
  var Association = $resource(configuration.api + '/associations/:id');
  var Event = $resource(configuration.api + '/events/:id');

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.allEvents = []
  $scope.allPastEvents = []

  MyAssociations.query({id:session.getAssociation()}, function(assosId) {
    for (assoId of assosId){
      Association.get({id:assoId}, function(association){
        var events = (association.events != null ? association.events : [])
        for (eventId of events){
          Event.get({id:eventId}, function(event){
            event.nbParticipant = (event.participants != null ? event.participants.length : 0)
            event.nbParticipant = (event.participants != null ? event.participants.length : 0)
            event.nbMaybe = (event.maybe != null ? event.maybe.length : 0)
            event.nbNotgoing = (event.notgoing != null ? event.notgoing.length : 0)
            event.nbComments = (event.comments != null ? event.comments.length : 0)
            event.associationName = association.name
            if(new Date(event.dateEnd).getTime() < new Date().getTime()){
              $scope.allPastEvents.push(event)
            }else{
              $scope.allEvents.push(event)
            }
            $scope.allEvents.sort(function(a, b){return new Date(a.dateStart).getTime()-new Date(b.dateStart).getTime()});
            $scope.allPastEvents.sort(function(a, b){return new Date(a.dateStart).getTime()-new Date(b.dateStart).getTime()});
            $scope.myEvents = $scope.allEvents
            $scope.pastEvents = $scope.allPastEvents
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

  $scope.search= function(val) {
    var results1 = $scope.allEvents
    var results2 = $scope.allPastEvents
    if(val.length >= 1) {
      results1 = results1.filter(function(event){
        return event.name.toLowerCase().includes(val.toLowerCase()) || event.associationName.toLowerCase().includes(val.toLowerCase())
      })
      results2 = results2.filter(function(event){
        return event.name.toLowerCase().includes(val.toLowerCase()) || event.associationName.toLowerCase().includes(val.toLowerCase())
      })
    }
    $scope.$apply(function () {
      $scope.myEvents = results1
      $scope.pastEvents = results2
    });
  }
}]);
