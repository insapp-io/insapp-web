app.controller('MyEventReader', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {
  var Event = $resource('http://127.0.0.1:9000/event/:id', null, {
    'update': { method:'PUT' }
  });

    Event.get({id:$routeParams.id}, function(event) {
        console.log(event)
        event.nbParticipant = (event.participants != null ? event.participants.length : 0)
        event.image = 'http://127.0.0.1:9003/' + event.photoURL
        $scope.currentEvent = event
      });

      $scope.updateEvent = function() {
        Event.update({id:$scope.currentEvent.ID}, $scope.currentEvent, function(event) {
          console.log("update event")
        });
      }

      $scope.deleteEvent = function() {
        Event.remove({id:$scope.currentEvent.ID}, function(event) {
          console.log("remove event")
        });
      }


    }]);
