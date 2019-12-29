class EventViewController {
  constructor(AppConstants, User, Event, Upload, $window, $state, $scope, event) {
    'ngInject'

    this._AppConstants = AppConstants
    this._User = User
    this._Event = Event
    this._Upload = Upload
    this._window = $window
    this._state = $state
    this._$scope = $scope
  
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
    
    this.event = this.sanitize(event)

    this.paletteGenerated = true
  }

  sanitize(event) {
    if (event.image) {
      event = {
        ...event,
        imageUrl: this._AppConstants.cdn + event.image
      }
    }

    for (const comment of event.comments) {
      this._User.get(comment.user).then(user => {
        comment.author = user.username
      })
    }

    // legacy events don't contain this field
    if (event.promotions) {
      for (const promotion of Object.keys(this.promotions)) {
        this.promotions[promotion] = event.promotions.includes(promotion.toUpperCase())
      }
    }

    return event
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
    if (this.event[field] && this.event[field].length && this.event[field].length > maxLength) {
      this.event[field] = this.event[field].substring(0, maxLength);
    }
  }
  
  selectColor(radio) {
    let bgColor = this.event.palette[radio]

    function distance(v1, v2){
      let i, d = 0

      for (i = 0; i < v1.length; i++) {
        d += (v1[i] - v2[i]) * (v1[i] - v2[i])
      }

      return Math.sqrt(d)
    }

    var d1 = distance(bgColor, [51, 51, 51])
    var d2 = distance(bgColor, [255, 255, 255])

    let fgColor = (d1 > d2 ? [51, 51, 51] : [255, 255, 255])

    this.event.selectedcolor = radio

    function rgbToHex(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }

    this.event.bgColor = rgbToHex(bgColor[0], bgColor[1], bgColor[2])
    this.event.fgColor = rgbToHex(fgColor[0], fgColor[1], fgColor[2])
  }
  
  upload(file) {
    const uploadUrl = this._AppConstants.api + '/images'

    this._Upload.upload({
      url: uploadUrl,
      data: {
        file
      }
    }).then(res => {
      this.event.image = res.data.file
      this.event.imageSize = res.data.size
      this.event.palette = res.data.colors
      this.selectColor(0)
      this.paletteGenerated = true
    }, res => {
      console.log('Error status: ' + res.status)
    })
  }

  removeFile() {
    this._$scope.file = undefined

    this.event.imageUrl = undefined
    this.event.image = ""
    this.event.imageSize = {}
    this.event.palette = []
    this.paletteGenerated = false
  }
    
  updateEvent() {
    const promotions = Object.keys(this.promotions).filter(promotion => {
      return this.promotions[promotion]
    })

    this.event.promotions = []
    for (const promotion of promotions) {
      this.event.promotions.push(promotion.toUpperCase())
    }

    this.event.plateforms = Object.keys(this.plateforms).filter(plateform => {
      return this.plateforms[plateform]
    })

    this._Event.save(this.event).then(event => {
      this._state.go('app.eventlist')
    })
  }

  deleteEvent() {
    this._Event.delete(this.event).then(event => {
      this._state.go('app.eventlist')
    })
  }
}

export default EventViewController
  