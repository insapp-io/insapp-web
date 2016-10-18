app.controller('Users', ['$scope', '$resource', '$location', 'Session', function($scope, $resource, $location, Session) {
  var User = $resource('https://insapp.fr/api/v1/user/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };

  User.query({token:Session.getToken()}, function(users) {
    $scope.allUsers = users
    //$scope.allUsers.sort(function(a, b){return new Date(a.date).getTime()-new Date(b.date).getTime()});
    $scope.users = $scope.allUsers
  }, function(error) {
      Session.destroyCredentials()
      $location.path('/login')
  });

  $scope.delete = function(user){
    console.log("delete user")
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
