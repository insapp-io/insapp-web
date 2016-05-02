app.controller('MyPostsReader', ['$scope', '$resource', '$routeParams', 'Session', '$location', 'ngDialog', function($scope, $resource, $routeParams, Session, $location, ngDialog) {
  var Post = $resource('http://127.0.0.1:9000/post/:id?token=:token', null, {
    'update': { method:'PUT' }
  });

  $scope.master = (Session.getMaster() == 'true')

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === "myPosts";
  };

    Post.get({id:$routeParams.id, token:Session.getToken()}, function(post) {
      post.nbLikes = (post.likes != null ? post.likes.length : 0)
      post.nbComments = (post.comments != null ? post.comments.length : 0)
        post.image = 'http://127.0.0.1:9003/' + post.photourl
        $scope.currentPost = post
      }, function(error) {
          Session.destroyCredentials()
          $location.path('/login')
      });

      $scope.updatePost = function() {
        Post.update({id:$scope.currentPost.ID, token:Session.getToken()}, $scope.currentPost, function(post) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>Le post a été mis à jour</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.deletePost = function() {
        Post.remove({id:$scope.currentPost.ID, token:Session.getToken()}, function(post) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>Le post a été supprimé</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.validatePost = function() {
        $scope.currentPost.status = "validated"
        Post.update({id:$scope.currentPost.ID, token:Session.getToken()}, $scope.currentPost, function(post) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>Le post a été validé</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.rejectPost = function() {
        $scope.currentPost.status = "rejected"
        Post.update({id:$scope.currentPost.ID, token:Session.getToken()}, $scope.currentPost, function(post) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>Le post a été rejeté</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.waitingPost = function() {
        $scope.currentPost.status = "waiting"
        Post.update({id:$scope.currentPost.ID, token:Session.getToken()}, $scope.currentPost, function(post) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>Le post à été mis en attente</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

    }]);
