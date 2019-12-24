function PostViewConfig($stateProvider) {
  'ngInject'
  
  $stateProvider.state('app.postview', {
    url: '/post/:id',
    controller: 'PostViewController as $controller',
    templateUrl: '/post/view.html',
    title: 'Mon post',
    resolve: {
      auth: User => {
        return User.ensureAuthIs(true)
      },
      post: (Post, $state, $stateParams) => {
        return Post.get($stateParams.id).then(
          post => post,
          err => $state.go('app.postlist')
        )
      }
    }
  })
}

export default PostViewConfig