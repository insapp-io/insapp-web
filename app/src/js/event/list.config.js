function EventListConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.eventlist', {
    url: '/events',
    controller: 'EventListController as $controller',
    templateUrl: '/event/list.html',
    title: 'Mes évènements',
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

export default EventListConfig