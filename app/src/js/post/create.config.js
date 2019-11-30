function PostCreateConfig($stateProvider) {
    'ngInject'
  
    $stateProvider.state('app.post.create', {
      url: '/createPost',
      controller: 'PostCreateController',
      controllerAs: '$controller',
      templateUrl: '/post/create.html',
      title: 'Créer un post'
    })
  }
  
  export default PostCreateConfig