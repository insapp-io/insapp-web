class PostController {
  constructor(post, $rootScope) {
    'ngInject'

    this.post = post

    $rootScope.setPageTitle(this.post.title)
  }
}

export default PostController

/*
app.controller('MyPostsReader', ['$scope', '$resource', '$routeParams', 'session', '$location', 'ngDialog', 'configuration', function($scope, $resource, $routeParams, session, $location, ngDialog, configuration) {
  var Post = $resource(configuration.api + '/posts/:id', null, { 'update': { method:'PUT' }});
  var Comment = $resource(configuration.api + '/posts/:id/comment/:commentId');

  $scope.master = (session.getMaster() == 'true')

  $scope.isActive = function (viewLocation) {
    return viewLocation === "myPosts";
  };

  String.prototype.isPromotion = function(str){
    var lastIndex = this.lastIndexOf(str);
    return (lastIndex == 1 && str.length == this.length-1) || (lastIndex == 0 && str.length == this.length)
  }

  $scope.promotionNames = ["CDTI", "EII", "GM", "GMA", "GCU", "INFO", "SGM", "SRC", "STPI", "STAFF"]
  $scope.showAdvancedSettings = false
  $scope.promotions = {
    "1STPI": true,
    "2STPI": true,
    "3CDTI": true,
    "4CDTI": true,
    "5CDTI": true,
    "3EII": true,
    "4EII": true,
    "5EII": true,
    "3GM": true,
    "4GM": true,
    "5GM": true,
    "3GMA": true,
    "4GMA": true,
    "5GMA": true,
    "3GCU": true,
    "4GCU": true,
    "5GCU": true,
    "3INFO": true,
    "4INFO": true,
    "5INFO": true,
    "3SGM": true,
    "4SGM": true,
    "5SGM": true,
    "3SRC": true,
    "4SRC": true,
    "5SRC": true,
    "STAFF": true
  }

  $scope.plateforms = {
    "android": true,
    "iOS": true,
  }

  $scope.select = function(promotion) {
    Object.keys($scope.promotions).forEach(function (key) {
      if (key.isPromotion(promotion)) {
          $scope.promotions[key] = true
      }
    })
  }

  $scope.deselect = function(promotion) {
    Object.keys($scope.promotions).forEach(function (key) {
        if (key.isPromotion(promotion)) {
            $scope.promotions[key] = false
        }
    })
  }

  $scope.selectYear = function(year){
    // year equals 1, 2 or 3
    Object.keys($scope.promotions).forEach(function (key) {
        if ((key.includes(year) && year != 3) || key.includes(year+2) || (year == 1 && key == "STAFF")) {
            $scope.promotions[key] = true
        }
    })
  }

  $scope.deselectYear = function(year){
    // year equals 1, 2 or 3
    Object.keys($scope.promotions).forEach(function (key) {
        if ((key.includes(year) && year != 3) || key.includes(year+2) || (year == 1 && key == "STAFF")) {
            $scope.promotions[key] = false
        }
    })
  }

  $scope.selectAllPromo = function(selected) {
    Object.keys($scope.promotions).forEach(function (key) {
      $scope.promotions[key] = selected
    })
  }

  $scope.invertPromo = function() {
    Object.keys($scope.promotions).forEach(function (key) {
      $scope.promotions[key] = !$scope.promotions[key]
    })
  }

  Post.get({id:$routeParams.id}, function(post) {
    post.nbLikes = (post.likes != null ? post.likes.length : 0)
    post.nbComments = (post.comments != null ? post.comments.length : 0)
      $scope.currentPost = post
      $scope.currentPost.imageUrl = configuration.cdn + post.image
      $scope.currentPost.enableNotification = !$scope.currentPost.nonotification

      for (promo in $scope.promotions) {
          $scope.promotions[promo] = $scope.currentPost.promotions.includes(promo.toUpperCase())
      }

      for (plateform in $scope.plateforms) {
          $scope.plateforms[plateform] = $scope.currentPost.plateforms.includes(plateform)
      }

    }, function(error) {
        session.destroyCredentials()
        $location.path('/login')
    });

  $scope.monitorLength = function (field, maxLength) {
    if ($scope.currentPost[field] && $scope.currentPost[field].length && $scope.currentPost[field].length > maxLength) {
      $scope.currentPost[field] = $scope.currentPost[field].substring(0, maxLength);
    }
  }

  $scope.deleteComment = function(commentId) {
    Comment.remove({id:$scope.currentPost.ID, commentId: commentId}, function(post) {
        post.nbLikes = (post.likes != null ? post.likes.length : 0)
        post.nbComments = (post.comments != null ? post.comments.length : 0)
        post.image = configuration.cdn + post.photourl
        $scope.currentPost = post
        $scope.currentPost.enableNotification = !$scope.currentPost.nonotification
      ngDialog.open({
          template: "<h2 style='text-align:center;'>Le commentaire a été supprimé</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
    }, function(error) {
        session.destroyCredentials()
        $location.path('/login')
    });
  }

  $scope.updatePost = function() {

    $scope.currentPost.nonotification = !$scope.currentPost.enableNotification

    var promotions = Object.keys($scope.promotions).filter(function(promotion) {
      return $scope.promotions[promotion]
    })

    $scope.currentPost.promotions = []
    for (i in promotions) {
      var promotion = promotions[i]
      $scope.currentPost.promotions.push(promotion.toUpperCase())
    }

    $scope.currentPost.plateforms = Object.keys($scope.plateforms).filter(function(plateform){
      return $scope.plateforms[plateform]
    })

    if ($scope.currentPost.plateforms.length == 0 || $scope.currentPost.promotions.length == 0) {
        ngDialog.open({
            template: "<h2 style='text-align:center;'>Choisis au moins 1 promotion et 1 plateforme</h2>",
            plain: true,
            className: 'ngdialog-theme-default'
        });
        return
    }
    Post.update({id:$scope.currentPost.ID}, $scope.currentPost, function(post) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>Le post a été mis à jour</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
    }, function(error) {
        session.destroyCredentials()
        $location.path('/login')
    });
  }

  $scope.deletePost = function() {
    Post.remove({id:$scope.currentPost.ID}, function(post) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>Le post a été supprimé</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
      $location.path('/myPosts')
    }, function(error) {
        session.destroyCredentials()
        $location.path('/login')
    });
  }
}]);
*/