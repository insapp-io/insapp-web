app.controller('LogoutAssociation', ['$location', 'session', function($location, session) {
  session.destroyCredentials()
  $location.path('/login')
}]);
