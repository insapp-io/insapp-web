app.controller('MyPostsReader', ['$scope', '$resource', '$routeParams', 'Session', '$location', 'ngDialog', function($scope, $resource, $routeParams, Session, $location, ngDialog) {
  var Post = $resource('https://api.thomasmorel.io/post/:id?token=:token', null, { 'update': { method:'PUT' } });
  var Comment = $resource('https://api.thomasmorel.io/post/:id/comment/:commentId?token=:token');

  $scope.master = (Session.getMaster() == 'true')

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/web/#login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === "myPosts";
  };

  Post.get({id:$routeParams.id, token:Session.getToken()}, function(post) {
    post.nbLikes = (post.likes != null ? post.likes.length : 0)
    post.nbComments = (post.comments != null ? post.comments.length : 0)
      $scope.currentPost = post
      $scope.currentPost.imageUrl = 'https://cdn.thomasmorel.io/' + post.image
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/web/#login')
    });

  $scope.monitorLength = function (field, maxLength) {
    if ($scope.currentPost[field] && $scope.currentPost[field].length && $scope.currentPost[field].length > maxLength) {
      $scope.currentPost[field] = $scope.currentPost[field].substring(0, maxLength);
    }
  }

  $scope.deleteComment = function(commentId) {
    Comment.remove({id:$scope.currentPost.ID, commentId: commentId, token:Session.getToken()}, function(post) {
      post.nbLikes = (post.likes != null ? post.likes.length : 0)
      post.nbComments = (post.comments != null ? post.comments.length : 0)
        post.image = 'https://cdn.thomasmorel.io/' + post.photourl
        $scope.currentPost = post
      ngDialog.open({
          template: "<h2 style='text-align:center;'>Le commentaire a été supprimé</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/web/#login')
    });
  }

  $scope.updatePost = function() {
    Post.update({id:$scope.currentPost.ID, token:Session.getToken()}, $scope.currentPost, function(post) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>Le post a été mis à jour</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/web/#login')
    });
  }

  $scope.deletePost = function() {
    Post.remove({id:$scope.currentPost.ID, token:Session.getToken()}, function(post) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>Le post a été supprimé</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
      $location.path('/web/#myPosts')
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/web/#login')
    });
  }

    }]);
