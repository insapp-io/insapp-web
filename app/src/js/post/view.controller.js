class PostViewController {
  constructor(AppConstants, User, Posts, Comments, Upload, $window, $state, post) {
    'ngInject'

    this._AppConstants = AppConstants
    this._User = User
    this._Posts = Posts
    this._Comments = Comments
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

    this.post = this.sanitize(post)
  }

  sanitize(post) {
    post = {
      ...post,
      imageUrl: this._AppConstants.cdn + '' + post.image
    }

    // legacy posts don't contain this field
    if (post.promotions) {
      for (const promotion of Object.keys(this.promotions)) {
        this.promotions[promotion] = post.promotions.includes(promotion.toUpperCase())
      }
    }

    return post
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

  updatePost() {
    const promotions = Object.keys(this.promotions).filter(promotion => {
      return this.promotions[promotion]
    })

    this.post.promotions = []
    for (const promotion of promotions) {
      this.post.promotions.push(promotion.toUpperCase())
    }

    this.post.plateforms = Object.keys(this.plateforms).filter(plateform => {
      return this.plateforms[plateform]
    })

    this._Posts.save(this.post).then(post => {
      this._state.go('app.postlist')
    })
  }

  deletePost() {
    this._Posts.delete(this.post).then(post => {
      this._state.go('app.postlist')
    })
  }

  deleteComment(post, comment) {
    this._Comments.delete(post, comment).then(post => {
      this.post = sanitize(post)
    })
  }
}

export default PostViewController