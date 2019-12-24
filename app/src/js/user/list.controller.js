class UserListController {
  constructor(User) {
    'ngInject'

    this._User = User

    this.runQuery()
  }
  
  runQuery() {
    this.loading = true

    this._User
      .query()
      .then(
        (res) => {
          this.list = res

          this.list.sort((a, b) => {
            if (a.username < b.username) return -1
            if (a.username > b.username) return 1
            return 0
          })

          this.loading = false
        }
      )
  }
}

export default UserListController

/*
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

}]);
*/