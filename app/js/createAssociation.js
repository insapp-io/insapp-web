app.controller('CreateAssociation', ['$scope', '$resource', 'Session', '$location', 'ngDialog', function($scope, $resource, Session, $location, ngDialog) {
  var Association = $resource('http://api.thomasmorel.io/association?token=:token')
  var User = $resource('http://api.thomasmorel.io/association/:id/user?token=:token')

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
};

  $scope.currentAssociation = {
    owner: Session.getAssociation(),
    master : false,
    username : "",
    password : "",
    name : "",
    association : "",
  }

  $scope.createAssociation = function() {
    Association.save({token:Session.getToken()}, $scope.currentAssociation, function(assos) {
      User.save({id:assos.ID, token:Session.getToken()}, $scope.currentAssociation, function(assos){
        ngDialog.open({
            template: "<h3 style='text-align:center;'>L'association à été créée</h3>",
            plain: true,
            className: 'ngdialog-theme-default'
        });
      });
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/login')
    });
  }

}])
;
