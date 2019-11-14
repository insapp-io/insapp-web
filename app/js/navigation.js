app.controller('NavigationController', ['$scope', 'session', '$location', 'configuration', function($scope, session, $location, configuration) {
    $scope.master = null;
    $scope.baseUrl = configuration.baseUrl
    $scope.isLoggedIn = isLoggedIn()
    session.setLoggedInCallback(isLoggedIn)

    function isLoggedIn(){
      $scope.master = (session.getMaster() == 'true')
      $scope.loggedIn = session.getToken() != null && session.getAssociation() != null
    }

    $scope.isActive = function (viewLocation) {
      return $location.path().indexOf(viewLocation) > -1
    };
}]);
