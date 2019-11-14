app.controller('Users', ['$scope', '$resource', '$location', 'session', '$loadingOverlay', 'ngDialog', 'configuration', function($scope, $resource, $location, session, $loadingOverlay, ngDialog, configuration) {
  var Users = $resource(configuration.api + '/users');
  var User = $resource(configuration.api + '/users/:id');

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.getUsers = function(){
    Users.query({}, function(users) {
      $scope.allUsers = users
      $scope.allUsers.sort(function(a, b){
        if(a.username < b.username) return -1;
        if(a.username > b.username) return 1;
        return 0;
      });
      $scope.users = $scope.allUsers
    }, function(error) {
        session.destroyCredentials()
        $location.path('/login')
    });
  }

  $scope.delete = function(user) {
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    User.remove({id:user.ID}, function(user) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>L'utilisateur a été supprimé</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
      $loadingOverlay.hide()
      $location.path('/users')
    }, function(error) {
        session.destroyCredentials()
        $location.path('/login')
    });
  }

   $scope.search = function(val) {
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

   $scope.getUsers()

   $loadingOverlay.show()
   ngDialog.open({
       template: "<h2 style='text-align:center;'>Attention !!</h2><p>Sur cette page, vous pouvez supprimer des utilisateurs. Ne le faites uniquement après un signalement. Il n'y a pas de confirmation</p>",
       plain: true,
       className: 'ngdialog-theme-default'
   });
   $loadingOverlay.hide()

}]);
