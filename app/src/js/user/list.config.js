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
      }
    }
  })
}

export default UserListConfig