function AssociationValidateConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.associationvalidate', {
    url: '/associations/validate',
    controller: 'AssociationValidateController as $controller',
    templateUrl: '/association/validate.html',
    title: 'Valider une association',
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

export default AssociationValidateConfig