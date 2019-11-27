app.controller('LoginAssociation', ['$scope', '$resource', '$location', 'session', 'ngDialog', 'configuration', function($scope, $resource, $location, session, ngDialog, configuration) {
  var Login = $resource(configuration.api + '/login/association');

  $scope.currentLogin = {
    username : "",
    password : "",
    error : ""
  }

  if (session.getAssociation() != null) {
    $location.path('/myPosts')
  } else {
    $scope.login = false
  }

  $scope.login = function() {
    Login.save({}, $scope.currentLogin, function(auth) {
      $scope.currentLogin.error = auth.error
      if (!auth.error) {
        session.setAssociation(auth.associationID)
        session.setMaster(auth.master)
        $location.path('/myPosts')
      }
    });
   };
}]);
