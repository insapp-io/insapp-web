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
      master: User => {
        return User.ensureAdminIs(true)
      },
      association: (auth, master, Association) => {
        return Association.getCurrent()
      }
    }
  })
}

export default AssociationCreateConfig