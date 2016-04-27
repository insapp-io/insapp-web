app.controller('NavigationController', ['$scope', 'Session', function($scope, Session) {
    $scope.master = null;
    $scope.isLoggedIn = isLoggedIn()
    Session.setLoggedInCallback(isLoggedIn)

    function isLoggedIn(){
      $scope.master = (Session.getMaster() == 'true')
      $scope.loggedIn = Session.getToken() != null && Session.getAssociation() != null
    }
}]);
