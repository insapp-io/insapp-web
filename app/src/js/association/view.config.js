function AssociationViewConfig($stateProvider) {
  'ngInject'

  $stateProvider
    .state('app.myassociationview', {
      url: '/association',
      controller: 'AssociationViewController as $controller',
      templateUrl: '/association/view.html',
      title: 'Mon association',
      resolve: {
        auth: User => {
          return User.ensureAuthIs(true)
        },
        association: (auth, Association) => {
          return Association.getCurrent()
        }
      }
    })
    .state('app.associationview', {
      url: '/association/:id',
      controller: 'AssociationViewController as $controller',
      templateUrl: '/association/view.html',
      title: 'Mon association',
      resolve: {
        auth: User => {
          return User.ensureAuthIs(true)
        },
        association: (auth, Association, $state, $stateParams) => {
          return Association.get($stateParams.id).then(
            association => association,
            err => $state.go('app.postlist')
          )
        }
      }
    })
}

export default AssociationViewConfig