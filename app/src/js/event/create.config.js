function EventCreateConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.eventcreate', {
    url: '/event/create',
    controller: 'EventCreateController as $controller',
    templateUrl: '/event/create.html',
    title: 'Créer un évènement',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      }
    }
  })
}
  
export default EventCreateConfig