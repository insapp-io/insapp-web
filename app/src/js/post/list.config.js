function PostListConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.postlist', {
    url: '/',
    controller: 'PostListController as $controller',
    templateUrl: '/post/list.html',
    title: 'Mes posts',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      }
    }
  })
}

export default PostListConfig