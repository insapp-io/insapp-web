function EventValidateConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.eventvalidate', {
    url: '/events/validate',
    controller: 'EventValidateController as $controller',
    templateUrl: '/event/validate.html',
    title: 'Valider un évènement',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      }
    }
  })
}

export default EventValidateConfig