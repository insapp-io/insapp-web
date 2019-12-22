class AssociationViewController {
  constructor(AppConstants, Association, Upload, $state, association) {
    'ngInject'

    this._AppConstants = AppConstants
    this._Association = Association
    this._Upload = Upload
    this._state = $state

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
    this.association.bgColor = this.rgbToHex(bgColor[0], bgColor[1], bgColor[2])
    this.association.fgColor = this.rgbToHex(fgColor[0], fgColor[1], fgColor[2])
  }
  
  rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  updateAssociation() {
    this._Association.save(this.association).then(association => {
      this._state.go('app.postlist')
    })
  }
}

export default AssociationViewController
/*
  $scope.$watch('coverPictureFile', function() {
    if ($scope.coverPictureFile && $scope.coverPictureFile != $scope.oldAssociation.coverPictureFile){

      var preview = document.querySelector('#coverPicture');
      var file    = $scope.coverPictureFile
      var reader  = new FileReader();

      $("#coverPicture").on('load',function(){
        if ($scope.coverPictureIsDirty){
          $scope.coverPictureIsDirty = false
          $scope.uploadImage($scope.coverPictureFile, null, function(response) {
            //console.log(response)
            $scope.currentAssociation.cover = response.file
            $scope.currentAssociation.palette = response.colors
            $scope.palette = response.colors
            $scope.selectColor(0)
          })
        }
      });

      reader.onloadend = function () {
        preview.src = reader.result
      }

      if (file instanceof File) {
        reader.readAsDataURL(file);
      }
    }
  });

  $scope.$watch('profilePictureFile', function() {
    if ($scope.profilePictureFile && $scope.profilePictureFile != $scope.oldAssociation.profilePictureFile){
      var preview = document.querySelector('#profilePicture');
      var file    = $scope.profilePictureFile
      var reader  = new FileReader();

      $("#profilePicture").on('load',function(){
        if ($scope.profilePictureIsDirty){
          $scope.profilePictureIsDirty = false
          $scope.uploadImage($scope.profilePictureFile, null, function(response) {
            $scope.currentAssociation.profileuploaded = response.file
          })
        }
      });

      reader.onloadend = function () {
        preview.src = reader.result
      }

      if (file instanceof File) {
        reader.readAsDataURL(file);
      }
    }
  });

  $scope.removeCoverPicture = function(){
    var preview = document.querySelector('#coverPicture');
    preview.src = null
    $scope.coverPictureIsDirty = true
    $scope.coverPictureFile = null
    $scope.palette = null
  }

  $scope.removeProfilePicture = function(){
    var preview = document.querySelector('#profilePicture');
    preview.src = null
    $scope.profilePictureIsDirty = true
    $scope.profilePictureFile = null
  }

  $scope.uploadImage = function (file, fileName, completion) {
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var uploadUrl = configuration.api + '/images';
    $scope.promise = fileUpload.uploadFileToUrl(file, uploadUrl, function(success, response){
      $loadingOverlay.hide()
      //console.log(response)
      if(success){
        completion(response)
      }else{
        $scope.removeCoverPicture()
        ngDialog.open({
            template: "<h2 style='text-align:center;'>Une erreur s'est produite :/</h2><p style='text-align:center;'>" + response + "</p>",
            plain: true,
            className: 'ngdialog-theme-default'
        });
      }
    });
  }
*/