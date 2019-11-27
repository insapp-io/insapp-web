function PostsConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.posts.list', {
    url: '/',
    controller: 'PostsController',
    controllerAs: '$controller',
    templateUrl: 'posts/myPosts.html',
    title: 'Mes posts'
  })

  $stateProvider.state('app.posts.list', {
    url: '/myPosts',
    controller: 'PostsController',
    controllerAs: '$controller',
    templateUrl: 'posts/myPosts.html',
    title: 'Mes posts'
  })

  $stateProvider.state('app.posts.view', {
    url: '/myPosts/:id',
    controller: 'PostsController',
    controllerAs: '$controller',
    templateUrl: 'posts/myPostsReader.html',
    title: 'Mon post'
  })

  $stateProvider.state('app.posts.create', {
    url: '/createPost',
    controller: 'PostsController',
    controllerAs: '$controller',
    templateUrl: 'posts/createPost.html',
    title: 'Créer un post'
  })

  $stateProvider.state('app.posts.validate', {
    url: '/validationPost',
    controller: 'PostsController',
    controllerAs: '$controller',
    templateUrl: 'posts/validationPost.html',
    title: 'Valider un post'
  })
}

export default PostsConfig