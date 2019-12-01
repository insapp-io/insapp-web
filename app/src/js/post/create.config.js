function PostCreateConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.postcreate', {
    url: '/post/create',
    controller: 'PostCreateController as $controller',
    templateUrl: '/post/create.html',
    title: 'Créer un post',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      }
    }
  })
}
  
export default PostCreateConfig