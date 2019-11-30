function PostListConfig($stateProvider) {
  'ngInject'

  $stateProvider.state('app.post', {
    url: '/myPosts',
    controller: 'PostListController as $controller',
    templateUrl: '/post/list.html',
    title: 'Mes posts'
  })
}

export default PostListConfig