app.controller('MyPosts', ['$scope', '$resource', '$location', 'Session', function($scope, $resource, $location, Session) {
  var Association = $resource('http://api.thomasmorel.io/association/:id?token=:token');
  var Post = $resource('http://api.thomasmorel.io/post/:id?token=:token');
  var Event = $resource('http://api.thomasmorel.io/event/:id?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };
  
  Association.get({id:Session.getAssociation(), token:Session.getToken()}, function(assos) {
    $scope.myPosts = []
    assos.posts = (assos.posts == null ? [] : assos.posts)
    for (postId of assos.posts){
      Post.get({id:postId, token:Session.getToken()}, function(post) {
        post.nbLikes = (post.likes != null ? post.likes.length : 0)
        post.nbComments = (post.comments != null ? post.comments.length : 0)
        post.associationName = assos.name
        Event.get({id:post.event, token:Session.getToken()}, function(event){
          post.eventName = event.name
          $scope.myPosts.push(post)
        });
      });
    }
  }, function(error) {
      Session.destroyCredentials()
      $location.path('/login')
  });

  $scope.onclick = function(post) {
      $location.path('/myPosts/' + post.ID)
   };

}]);
