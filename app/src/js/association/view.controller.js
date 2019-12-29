class AssociationViewController {
  constructor(AppConstants, Association, Upload, $state, $scope, association) {
    'ngInject'

    this._AppConstants = AppConstants
    this._Association = Association
    this._Upload = Upload
    this._state = $state
    this._$scope = $scope

    this.association = this.sanitize(association)

    this.paletteGenerated = true
  }

  sanitize(association) {
    association = {
      ...association,
      profilePictureUrl: association.profileuploaded ? (this._AppConstants.cdn + association.profileuploaded) : null,
      coverPictureUrl: association.cover ? (this._AppConstants.cdn + association.cover) : null
    }

    return association
  }

  monitorLength(field, maxLength) {
    if (this.association[field] && this.association[field].length && this.association[field].length > maxLength) {
      this.association[field] = this.association[field].substring(0, maxLength);
    }
  }
  
  selectColor(radio) {
    let bgColor = this.association.palette[radio]

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

    this.association.selectedcolor = radio

    function rgbToHex(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }

    this.association.bgColor = rgbToHex(bgColor[0], bgColor[1], bgColor[2])
    this.association.fgColor = rgbToHex(fgColor[0], fgColor[1], fgColor[2])
  }

  uploadCoverPicture(file) {
    const uploadUrl = this._AppConstants.api + '/images'

    this._Upload.upload({
      url: uploadUrl,
      data: {
        file
      }
    }).then(res => {
      this.association.cover = res.data.file
      this.association.palette = res.data.colors
      this.selectColor(0)
      this.paletteGenerated = true
    }, err => {
      this.removeCoverPictureFile()
      console.log('Error status: ' + err.status)
    })
  }

  removeCoverPictureFile() {
    this._$scope.coverPictureFile = undefined
    
    this.association.coverPictureUrl = undefined
    this.association.cover = ""
    this.association.palette = []
    this.paletteGenerated = false
  }

  uploadProfilePicture(file) {
    const uploadUrl = this._AppConstants.api + '/images'

    this._Upload.upload({
      url: uploadUrl,
      data: {
        file
      }
    }).then(res => {
      this.association.profileuploaded = res.data.file
    }, err => {
      this.removeProfilePictureFile()
      console.log('Error status: ' + err.status)
    })
  }

  removeProfilePictureFile() {
    this._$scope.profilePictureFile = undefined
    
    this.association.profilePictureUrl = undefined
    this.association.profileuploaded = ""
  }

  updateAssociation() {
    this._Association.save(this.association).then(association => {
      this._state.go('app.postlist')
    })
  }
}

export default AssociationViewController
