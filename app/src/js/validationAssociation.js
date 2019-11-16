app.controller('ValidationAssociation', ['$scope', '$resource', '$location', 'session', 'configuration', function($scope, $resource, $location, session, configuration) {
  var MyAssociations = $resource(configuration.api + '/associations/:id/myassociations');
  var Association = $resource(configuration.api + '/associations/:id');

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.allAssocations = []

  MyAssociations.query({id:session.getAssociation()}, function(assosId) {
    for (assoId of assosId){
      Association.get({id:assoId}, function(association){
        $scope.allAssocations.push(association)
        $scope.allAssocations.sort(function(a, b){
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        $scope.myAssociations = $scope.allAssocations
      });
    }
  }, function(error) {
      $location.path('/login')
  });

  $scope.onclick = function(association) {
      $location.path('/myAssociation/' + association.ID)
  };

  $scope.search= function(val) {
    var results = $scope.allAssocations
    if(val.length >= 1) {
      results = results.filter(function(assos){
        return assos.name.toLowerCase().includes(val.toLowerCase())
      })
    }
    $scope.$apply(function () {
      $scope.myAssociations = results
    });
  }
}]);
