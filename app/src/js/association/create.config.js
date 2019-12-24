function AssociationCreateConfig($stateProvider) {
  'ngInject'
  
  $stateProvider.state('app.associationcreate', {
    url: '/association/create',
    controller: 'AssociationCreateController as $controller',
    templateUrl: '/association/create.html',
    title: 'Créer une association',
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

export default AssociationCreateConfig