function AssociationViewConfig($stateProvider) {
  'ngInject'
  
  $stateProvider.state('app.associationview', {
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
}

export default AssociationViewConfig