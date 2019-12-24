class PostCreateController {
  constructor(AppConstants, User, Post, Upload, $window, $state) {
    'ngInject'

    this._AppConstants = AppConstants
    this._User = User
    this._Post = Post
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

    this.post = {
      title       : "",
      association : this._User.current.association,
      description : "",
      image       : "",
      imageSize   : {},
      comments    : [],
      plateforms  : [],
      promotions  : [],
      likes       : [],
      nonotification: false
    }
  }

  noPromotionSelected() {
    return Object.keys(this.promotions).every(promotion => {
      return !this.promotions[promotion]
    })
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

  removeFile() {
    
  }

  searchGif() {
    this._window.open('http://giphy.com', '_blank')
  }

  upload(file) {
    const uploadUrl = this._AppConstants.api + '/images'

    this._Upload.upload({
      url: uploadUrl,
      data: {
        file
      }
    }).then(res => {
      this.post.image = res.data.file
      this.post.imageSize = res.data.size
      //console.log('Success ' + res.config.data.file.name + 'uploaded')
      //console.log('Response: ' + JSON.stringify(res.data))
    }, res => {
      console.log('Error status: ' + res.status)
    })
  }

  createPost() {
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

    this._Post.save(this.post).then(post => {
      this._state.go('app.postlist')
    })
  }
}

export default PostCreateController
