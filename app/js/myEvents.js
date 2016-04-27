app.controller('MyEvents', ['$scope', '$resource', '$location', function($scope, $resource, $location) {
  var Association = $resource('http://127.0.0.1:9000/association/:id');
  var Event = $resource('http://127.0.0.1:9000/event/:id');


  Association.get({id:"56d3716d0254b40c899f7988"}, function(assos) {
    $scope.myEvents = []
    for (eventID of assos.events){
      Event.get({id:eventID}, function(event) {
        event.nbParticipant = (event.participants != null ? event.participants.length : 0)
        $scope.myEvents.push(event)
      });
    }
  });

  $scope.onclick = function(event) {
      $location.path('/myEvents/' + event.ID)
   };

}]);
