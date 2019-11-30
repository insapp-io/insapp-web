function PostValidateConfig($stateProvider) {
    'ngInject'
  
    $stateProvider.state('app.post.validate', {
      url: '/validationPost',
      controller: 'PostValidateController',
      controllerAs: '$controller',
      templateUrl: '/post/validate.html',
      title: 'Valider un post'
    })
  }
  
  export default PostValidateConfig