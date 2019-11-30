function PostViewConfig($stateProvider) {
    'ngInject'
  
    $stateProvider.state('app.post.view', {
      url: '/myPosts/:id',
      controller: 'PostController',
      controllerAs: '$controller',
      templateUrl: '/post/view.html',
      title: 'Mon post'
    })
  }
  
  export default PostViewConfig