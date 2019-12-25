function PostValidateConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.postvalidate', {
    url: '/posts/validate',
    controller: 'PostValidateController as $controller',
    templateUrl: '/post/validate.html',
    title: 'Valider un post',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      }
    }
  })
}

export default PostValidateConfig