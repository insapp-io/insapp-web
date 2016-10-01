app.controller('MyEvents', ['$scope', '$resource', '$location', 'Session', function($scope, $resource, $location, Session) {
  var Association = $resource('https://insapp.thomasmorel.io/api/v1/association/:id?token=:token');
  var Event = $resource('https://insapp.thomasmorel.io/api/v1/event/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };


  Association.get({id:Session.getAssociation(), token:Session.getToken()}, function(assos) {
    $scope.allEvents = []
    $scope.allPastEvents = []
    assos.events = (assos.events == null ? [] : assos.events)
    for (eventID of assos.events){
      Event.get({id:eventID, token:Session.getToken()}, function(event) {
        event.nbParticipant = (event.participants != null ? event.participants.length : 0)
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
      Session.destroyCredentials()
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
