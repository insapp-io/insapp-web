app.controller('CreatePost', ['$scope', '$resource', '$routeParams', 'fileUpload', 'Session', '$location', 'ngDialog', '$loadingOverlay', function($scope, $resource, $routeParams, fileUpload, Session, $location, ngDialog, $loadingOverlay) {
  var Post = $resource('https://api.thomasmorel.io/post?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === "myPosts";
  };

    $scope.$watch('file', function() {
      if ($scope.file){

        var preview = document.querySelector('img');
        var file    = $scope.file
        var reader  = new FileReader();

        reader.onloadend = function () {
          preview.src = reader.result
        }

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    });

    $scope.removeFile = function(){
      $scope.file = null
    }

  $scope.currentPost = {
      title        : "",
      association : Session.getAssociation(),
      description : "",
      photoURL    : "",
      status      : "waiting",
      comments: [],
      likes     : []
    }

  $scope.monitorLength = function (field, maxLength) {
    if ($scope.currentPost[field] && $scope.currentPost[field].length && $scope.currentPost[field].length > maxLength) {
      $scope.currentPost[field] = $scope.currentPost[field].substring(0, maxLength);
    }
  }

  $scope.createPost = function() {
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    Post.save({token:Session.getToken()}, $scope.currentPost, function(post) {
      if($scope.file){
        var file = $scope.file;
        var uploadUrl = 'https://api.thomasmorel.io/post/' + post.ID + '/image?token=' + Session.getToken();
        fileUpload.uploadFileToUrl(file, uploadUrl, function(success){
          $loadingOverlay.hide()
          if(success){
            ngDialog.open({
                template: "<h2 style='text-align:center;'>Le post a bien été créé</h2>",
                plain: true,
                className: 'ngdialog-theme-default'
            });
          }else{
            ngDialog.open({
                template: "<h2 style='text-align:center;'>Une erreur s'est produite :/</h2>",
                plain: true,
                className: 'ngdialog-theme-default'
            });
          }
        });
      }else{
        $loadingOverlay.hide()
      }

    }, function(error) {
        Session.destroyCredentials()
        $location.path('/login')
    });
  }
}]);
