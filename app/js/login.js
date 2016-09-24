app.controller('LoginAssociation', ['$scope', '$resource', '$location', 'Session', 'ngDialog', function($scope, $resource, $location, Session, ngDialog) {
  var Login = $resource('https://api.thomasmorel.io/login/association');

  $scope.currentLogin = {
    username : "",
    password : "",
    error : ""
  }

  if(Session.getToken() != null && Session.getAssociation() != null){
    $location.path('/web/#/myEvents')
  }else{
    $scope.login = false
  }

  $scope.login = function() {
      Login.save({}, $scope.currentLogin, function(auth){
        $scope.currentLogin.error = auth.error
        if (!auth.error) {
          Session.setToken(auth.token)
          //console.log("heeeeeeeerrre")
          Session.setAssociation(auth.associationID)
          Session.setMaster(auth.master)
          $location.path('/web/#/myEvents')
        }
      });
   };

}]);
