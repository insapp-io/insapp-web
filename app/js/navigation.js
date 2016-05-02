app.controller('NavigationController', ['$scope', 'Session', '$location', function($scope, Session, $location) {
    $scope.master = null;
    $scope.isLoggedIn = isLoggedIn()
    Session.setLoggedInCallback(isLoggedIn)

    function isLoggedIn(){
      $scope.master = (Session.getMaster() == 'true')
      $scope.loggedIn = Session.getToken() != null && Session.getAssociation() != null
    }

    $scope.isActive = function (viewLocation) {
      return $location.path().indexOf(viewLocation) > -1
    };
}]);
