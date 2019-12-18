class PostViewController {
  constructor(AppConstants, User, Posts, Upload, $window, $state, post) {
    'ngInject'

    this._AppConstants = AppConstants
    this._User = User
    this._Posts = Posts
    this._Upload = Upload
    this._window = $window
    this._state = $state

    this.promotionNames = [
      "CDTI",
      "EII",
      "GM",
      "GMA",
      "GCU",
      "INFO",
      "SGM",
      "SRC",
      "STPI",
      "STAFF"
    ]
    
    this.promotions = {
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

    this.plateforms = {
      "android": true,
      "iOS": true,
    }

    this.post = {
      ...post,
      imageUrl: this._AppConstants.cdn + '' + post.image
    }
  }

  isPromotion(key, str) {
    const lastIndex = key.lastIndexOf(str)
    return (lastIndex == 1 && str.length == key.length-1) || (lastIndex == 0 && str.length == key.length)
  }

  select(promotion) {
    Object.keys(this.promotions).forEach(key => {
      if (this.isPromotion(key, promotion)) {
        this.promotions[key] = true
      }
    })
  }

  deselect(promotion) {
    Object.keys(this.promotions).forEach(key => {
      if (this.isPromotion(key, promotion)) {
        this.promotions[key] = false
      }
    })
  }

  selectYear(year) {
    // year equals 1, 2, or 3
    Object.keys(this.promotions).forEach(key => {
      if ((key.includes(year) && year != 3) || key.includes(year+2) || (year == 1 && key == "STAFF")) {
        this.promotions[key] = true
      }
    })
  }

  deselectYear(year) {
    // year equals 1, 2, or 3
    Object.keys(this.promotions).forEach(key => {
      if ((key.includes(year) && year != 3) || key.includes(year+2) || (year == 1 && key == "STAFF")) {
        this.promotions[key] = false
      }
    })
  }

  selectAllPromo(selected) {
    Object.keys(this.promotions).forEach(key => {
      this.promotions[key] = selected
    })
  }

  invertPromo() {
    Object.keys(this.promotions).forEach(key => {
      this.promotions[key] = !this.promotions[key]
    })
  }

  monitorLength(field, maxLength) {
    if (this.post[field] && this.post[field].length && this.post[field].length > maxLength) {
      this.post[field] = this.post[field].substring(0, maxLength);
    }
  }
}

export default PostViewController

/*

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