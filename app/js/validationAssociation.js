app.controller('ValidationAssociation', ['$scope', '$resource', '$location', 'Session', function($scope, $resource, $location, Session) {
  var MyAssociations = $resource('https://insapp.thomasmorel.io/api/v1/association/:id/myassociations?token=:token');
  var Association = $resource('https://insapp.thomasmorel.io/api/v1/association/:id?token=:token');
  var Post = $resource('https://insapp.thomasmorel.io/api/v1/post/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
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
      $location.path('/login')
  });

  $scope.onclick = function(association) {
      $location.path('/myAssociation/' + association.ID)
   };

}]);
