app.controller('Users', ['$scope', '$resource', '$location', 'Session', '$loadingOverlay', 'ngDialog', function($scope, $resource, $location, Session, $loadingOverlay, ngDialog) {
  var Users = $resource('https://insapp.fr/api/v1/user?token=:token');
  var User = $resource('https://insapp.fr/api/v1/user/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };

  Users.query({token:Session.getToken()}, function(users) {
    $scope.allUsers = users
    //$scope.allUsers.sort(function(a, b){return new Date(a.date).getTime()-new Date(b.date).getTime()});
    $scope.users = $scope.allUsers
  }, function(error) {
      Session.destroyCredentials()
      $location.path('/login')
  });

  $scope.delete = function(user) {
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    User.remove({id:user.ID, token:Session.getToken()}, function(user) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>L'utilisateur a été supprimé</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
      $loadingOverlay.hide()
      $location.path('/users')
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/login')
    });
  }

   $scope.search= function(val) {
     var results = $scope.allUsers
     if(val.length >= 1) {
       results = results.filter(function(user){
         return user.name.toLowerCase().includes(val.toLowerCase()) || user.username.toLowerCase().includes(val.toLowerCase()) || user.ID.toLowerCase().includes(val.toLowerCase())
       })
     }
     $scope.$apply(function () {
       $scope.users = results
     });
   }

}]);
