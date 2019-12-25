class PostValidateController {
  constructor(Post, Association) {
    'ngInject'

    this._Post = Post
    this._Association = Association

    this.runQuery()
  }

  runQuery() {
    this.loading = true

    this._Post
      .query({
        count: 100
      })
      .then(
        (res) => {
          this.list = res

          for (const post of this.list) {
            this._Association.get(post.association).then(association => {
              post.associationName = association.name
            })
          }

          this.loading = false
        }
      )
  }
}

export default PostValidateController
