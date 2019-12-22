function PostListConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.postlist', {
    url: '/posts',
    controller: 'PostListController as $controller',
    templateUrl: '/post/list.html',
    title: 'Mes posts',
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

export default PostListConfig