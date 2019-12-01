class PostListController {
  constructor(Posts, User) {
    'ngInject'

    this._Posts = Posts
    this.currentUser = User.current

    this.isAllSetUp = true

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

  $scope.onclick = function(post) {
      $location.path('/myPosts/' + post.ID)
   };
}]);
*/