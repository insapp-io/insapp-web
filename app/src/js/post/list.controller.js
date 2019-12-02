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
  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  }

  $scope.onclick = function(post) {
      $location.path('/myPosts/' + post.ID)
   }
*/