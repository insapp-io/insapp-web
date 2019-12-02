class PostListController {
  constructor(Association, Posts) {
    'ngInject'

    this._Association = Association
    this._Posts = Posts

    this.isAllSetUp = (this._Association.current.profile && this._Association.current.profile != '')

    this.runQuery()
  }
  
  runQuery() {
    this.loading = true

    this._Posts
      .query({
        association: this._Association.current.ID
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
