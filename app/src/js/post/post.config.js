function PostConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.post.list', {
    url: '/myPosts',
    controller: 'PostListController',
    controllerAs: '$controller',
    templateUrl: '/post/list.html',
    title: 'Mes posts',
    resolve: {
      posts: (Posts, $state, $stateParams) => {
        return Posts.query().then(
          (posts) => posts,
          (err) => $state.go('app.post.list')
        )
      }
    }
  })

  $stateProvider.state('app.post.view', {
    url: '/myPosts/:id',
    controller: 'PostController',
    controllerAs: '$controller',
    templateUrl: '/post/view.html',
    title: 'Mon post'
  })

  $stateProvider.state('app.post.create', {
    url: '/createPost',
    controller: 'PostCreateController',
    controllerAs: '$controller',
    templateUrl: '/post/create.html',
    title: 'Créer un post'
  })

  $stateProvider.state('app.post.validate', {
    url: '/validationPost',
    controller: 'PostValidateController',
    controllerAs: '$controller',
    templateUrl: '/post/validate.html',
    title: 'Valider un post'
  })
}

export default PostConfig