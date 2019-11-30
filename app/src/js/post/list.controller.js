class PostListController {
  constructor(Posts, User) {
    'ngInject'

    this._Posts = Posts
    this.currentUser = User.current

    this.runQuery()
  }
  
  runQuery() {
    this.loading = true

    this._Posts
      .query({
        association: this.currentUser.association
      })
      .then(
        (res) => {
          this.loading = false
          this.list = res
        }
      )
  }
}

export default PostListController

/*
app.controller('MyPosts', ['$scope', '$resource', '$location', 'session', 'configuration', function($scope, $resource, $location, session, configuration) {
  var Association = $resource(configuration.api + '/associations/:id');
  var Post = $resource(configuration.api + '/posts/:id');

  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };

  $scope.isAllSetUp = false
  $scope.baseUrl = configuration.baseUrl

  Association.get({id:session.getAssociation()}, function(assos) {
    $scope.allPosts = []
    $scope.isAllSetUp = (assos.profile && assos.profile != "")
    assos.posts = (assos.posts == null ? [] : assos.posts)
    for (postId of assos.posts){
      Post.get({id:postId}, function(post) {
        post.nbLikes = (post.likes != null ? post.likes.length : 0)
        post.nbComments = (post.comments != null ? post.comments.length : 0)
        post.associationName = assos.name
        $scope.allPosts.push(post)
        $scope.allPosts.sort(function(a, b){return new Date(a.date).getTime()-new Date(b.date).getTime()});
        $scope.myPosts = $scope.allPosts
      });
    }
  }, function(error) {
      session.destroyCredentials()
      $location.path('/login')
  });

  $scope.onclick = function(post) {
      $location.path('/myPosts/' + post.ID)
   };

   $scope.search= function(val) {
     var results = $scope.allPosts
     if(val.length >= 1) {
       results = results.filter(function(post){
         return post.title.toLowerCase().includes(val.toLowerCase()) || post.associationName.toLowerCase().includes(val.toLowerCase())
       })
     }
     $scope.$apply(function () {
       $scope.myPosts = results
     });
   }

}]);
*/