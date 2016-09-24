app.controller('ValidationAssociation', ['$scope', '$resource', '$location', 'Session', function($scope, $resource, $location, Session) {
  var MyAssociations = $resource('https://api.thomasmorel.io/association/:id/myassociations?token=:token');
  var Association = $resource('https://api.thomasmorel.io/association/:id?token=:token');
  var Post = $resource('https://api.thomasmorel.io/post/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/web/#/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };

  $scope.myAssociations = []

  MyAssociations.query({id:Session.getAssociation(), token:Session.getToken()}, function(assosId) {
    for (assoId of assosId){
      Association.get({id:assoId, token:Session.getToken()}, function(association){
        $scope.myAssociations.push(association)
      });
    }
  }, function(error) {
      $location.path('/web/#/login')
  });

  $scope.onclick = function(association) {
      $location.path('/web/#/myAssociation/' + association.ID)
   };

}]);
