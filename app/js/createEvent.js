app.controller('CreateEvent', ['$scope', '$resource', function($scope, $resource) {
  var Event = $resource('http://127.0.0.1:9000/event/:id');

  $scope.currentEvent = {
      name        : "",
      association : "56d3716d0254b40c899f7988",
      description : "",
      photoURL    : "",
      status      : "waiting",
      dateStart   : "",
      dateEnd     : "",
      participants: [],
      bgColor     : "FFEE33",
      fgColor     : "333333"
    }

  $scope.createEvent = function() {
    Event.save({}, $scope.currentEvent, function(event) {
    });
  }

}]);
