app.controller('MyEventReader', ['$scope', '$resource', '$routeParams', 'Session', '$location', 'ngDialog', function($scope, $resource, $routeParams, Session, $location, ngDialog) {
  var Event = $resource('http://127.0.0.1:9000/event/:id?token=:token', null, {
    'update': { method:'PUT' }
  });

  $scope.master = (Session.getMaster() == 'true')

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

    Event.get({id:$routeParams.id, token:Session.getToken()}, function(event) {
        console.log(event)
        event.nbParticipant = (event.participants != null ? event.participants.length : 0)
        event.image = 'http://127.0.0.1:9003/' + event.photoURL
        $scope.currentEvent = event
      });

      $scope.updateEvent = function() {
        Event.update({id:$scope.currentEvent.ID, token:Session.getToken()}, $scope.currentEvent, function(event) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été mis à jour</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
          $location.path('/myEvents')
        });
      }

      $scope.deleteEvent = function() {
        Event.remove({id:$scope.currentEvent.ID, token:Session.getToken()}, function(event) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été supprimé</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
          $location.path('/myEvents')
        });
      }


    }]);
