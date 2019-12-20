app.controller('MyEvents', ['$scope', '$resource', '$location', 'session', 'configuration', function($scope, $resource, $location, session, configuration) {
  var Association = $resource(configuration.api + '/associations/:id');
  var Event = $resource(configuration.api + '/events/:id');

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.isAllSetUp = false
  $scope.baseUrl = configuration.baseUrl

  Association.get({id:session.getAssociation()}, function(assos) {
    $scope.allEvents = []
    $scope.allPastEvents = []
    $scope.isAllSetUp = (assos.profile && assos.profile != "")
    assos.events = (assos.events == null ? [] : assos.events)
    for (eventID of assos.events){
      Event.get({id:eventID}, function(event) {
        event.nbParticipant = (event.participants != null ? event.participants.length : 0)
        event.nbMaybe = (event.maybe != null ? event.maybe.length : 0)
        event.nbNotgoing = (event.notgoing != null ? event.notgoing.length : 0)
        event.nbComments = (event.comments != null ? event.comments.length : 0)
        if(new Date(event.dateEnd).getTime() < new Date().getTime()){
          $scope.allPastEvents.push(event)
        }else{
          $scope.allEvents.push(event)
        }
        $scope.allEvents.sort(function(a, b){return new Date(a.dateStart).getTime()-new Date(b.dateStart).getTime()});
        $scope.allPastEvents.sort(function(a, b){return new Date(a.dateStart).getTime()-new Date(b.dateStart).getTime()});
        $scope.pastEvents = $scope.allPastEvents
        $scope.myEvents = $scope.allEvents
      });
    }
  }, function(error) {
      session.destroyCredentials()
      $location.path('/login')
  });

  $scope.onclick = function(event) {
      $location.path('/myEvents/' + event.ID)
   };

  $scope.search= function(val) {
    var results1 = $scope.allEvents
    var results2 = $scope.allPastEvents
    if(val.length > 1) {
      results1 = results1.filter(function(event){
        return event.name.toLowerCase().includes(val.toLowerCase())
      })
      results2 = results2.filter(function(event){
        return event.name.toLowerCase().includes(val.toLowerCase())
      })
    }
    $scope.$apply(function () {
      $scope.myEvents = results1
      $scope.pastEvents = results2
    });
  }
}]);
