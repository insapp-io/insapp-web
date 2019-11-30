class PostListController {
  constructor(Posts, $scope) {
    'ngInject'

    this._Posts = Posts

    this.setListTo(this.listConfig)

    $scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList)
    })
  }
  
  setListTo(newList) {
    // Set the current list to an empty array
    this.list = []

    // Set listConfig to the new list's config
    this.listConfig = newList

    this.runQuery()
  }
  
  runQuery() {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {}

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {}
    }

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1))

    // Run the query
    this._Posts
      .query(queryConfig)
      .then(
        (res) => {
          this.loading = false

          // Update list and total pages
          this.list = res.data

          this.listConfig.totalPages = Math.ceil(res.articlesCount / this.limit)
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