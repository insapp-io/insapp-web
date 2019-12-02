class PostCreateController {
  constructor(AppConstants, User, $window) {
    'ngInject'

    this._AppConstants = AppConstants
    this._User = User
    this.window = $window

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
      enableNotification: true
    }
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
    let preview = document.querySelector('#postImage')
    preview.src = null

    this.postImageFile = null
  }

  searchGif() {
    this.window.open('http://giphy.com', '_blank')
  }

  uploadImage(file, fileName, completion) {
    const uploadUrl = this._AppConstants.api + '/images' + (fileName && fileName.length > 10 ? "/" + fileName : "")

    /*
    $scope.promise = fileUpload.uploadFileToUrl(file, uploadUrl, function(success, response){
      $loadingOverlay.hide()
      console.log(success)
      if(success){
        completion(response)
      }else{
        $scope.removeFile()
        ngDialog.open({
            template: "<h2 style='text-align:center;'>Une erreur s'est produite :/</h2><p>" + response + "</p>",
            plain: true,
            className: 'ngdialog-theme-default'
        })
      }
    })
    */
   console.log(uploadUrl)
  }

  createPost() {
    this.post.nonotification = !this.post.enableNotification

    let promotions = Object.keys($scope.promotions).filter(promotion => {
      return this.promotions[promotion]
    })

    this.post.promotions = []
    for (i in promotions) {
      promotion = promotions[i]
      this.post.promotions.push(promotion.toUpperCase())
    }

    this.post.plateforms = Object.keys($scope.plateforms).filter(plateform => {
      return this.plateforms[plateform]
    })

    if (this.post.plateforms.length == 0 || this.post.promotions.length == 0) {
      ngDialog.open({
        template: "<h2 style='text-align:center;'>Choisis au moins 1 promotion et 1 plateforme</h2>",
        plain: true,
        className: 'ngdialog-theme-default'
      })
      return
    }

    /*
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow")

    Post.save({}, this.currentPost, post => {
      ngDialog.open({
        template: "<h2 style='text-align:center;'>Le post a bien été créé</h2>",
        plain: true,
        className: 'ngdialog-theme-default'
      })
      $loadingOverlay.hide()
      $scope.currentPost = post
      $location.path('/myPosts')
    }, function(error) {
      displayError = error.status + " " + error.statusText
      if(error.data.error){
        displayError += " -- " + error.data.error
      }

      ngDialog.open({
        template: "<h3 style='text-align:center;'>Une erreur est survenue :\n" + displayError + "</h3>",
        plain: true,
        className: 'ngdialog-theme-default'
      })
      $loadingOverlay.hide()
    })
    */
  }
}

export default PostCreateController
