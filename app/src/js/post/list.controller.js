class PostListController {
  constructor(Posts, association) {
    'ngInject'

    this._Posts = Posts
    this._association = association

    this.isAllSetUp = (this._association.profile && this._association.profile !== '')

    this.runQuery()
  }
  
  runQuery() {
    this.loading = true

    this._Posts
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
