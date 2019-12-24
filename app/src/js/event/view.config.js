function EventViewConfig($stateProvider) {
  'ngInject'
  
  $stateProvider.state('app.eventview', {
    url: '/event/:id',
    controller: 'EventViewController as $controller',
    templateUrl: '/event/view.html',
    title: 'Mon évènement',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      },
      event: (Event, $state, $stateParams) => {
        return Event.get($stateParams.id).then(
          event => event,
          err => $state.go('app.eventlist')
        )
      }
    }
  })
}

export default EventViewConfig