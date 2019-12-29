function UserListConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.userlist', {
    url: '/users',
    controller: 'UserListController as $controller',
    templateUrl: '/user/list.html',
    title: 'Utilisateurs',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      },
      master: User => {
        return User.ensureAdminIs(true)
      }
    }
  })
}

export default UserListConfig