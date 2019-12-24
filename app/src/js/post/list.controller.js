class PostListController {
  constructor(Post, association) {
    'ngInject'

    this._Post = Post
    this._association = association

    this.isAllSetUp = (this._association.profileuploaded && this._association.profileuploaded !== '')

    this.runQuery()
  }
  
  runQuery() {
    this.loading = true

    this._Post
      .query({
        association: this._association.ID
      })
      .then(
        (res) => {
          this.list = res
          this.loading = false
        }
      )
  }
}

export default PostListController
