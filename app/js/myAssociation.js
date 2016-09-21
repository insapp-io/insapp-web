app.controller('MyAssociation', ['$scope', '$resource', 'Session', '$location', 'ngDialog', '$colorThief', 'Upload', 'fileUpload', '$loadingOverlay', function($scope, $resource, Session, $location, ngDialog, $colorThief, Upload, fileUpload, $loadingOverlay) {
  var Association = $resource('https://api.thomasmorel.io/association/:id?token=:token', null, {
  'update': { method:'PUT' }
});

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
};

  $scope.monitorLength = function (field, maxLength) {
    if ($scope.currentAssociation[field] && $scope.currentAssociation[field].length && $scope.currentAssociation[field].length > maxLength) {
      $scope.currentAssociation[field] = $scope.currentAssociation[field].substring(0, maxLength);
    }
  }

  $scope.distance = function(v1, v2){
      var i, d = 0;
      for (i = 0; i < v1.length; i++) {
          d += (v1[i] - v2[i])*(v1[i] - v2[i]);
      }
      return Math.sqrt(d);
  };

    $scope.$watch('coverPictureFile', function() {
      if ($scope.coverPictureFile && $scope.coverPictureFile != $scope.oldAssociation.coverPictureFile){

        var preview = document.querySelector('#coverPicture');
        var file    = $scope.coverPictureFile
        var reader  = new FileReader();

        $("#coverPicture").on('load',function(){
          if ($scope.coverPictureFile && $scope.coverPictureFile != $scope.oldAssociation.coverPictureFile){
            var colorThief = new ColorThief()
            var palette = colorThief.getPalette(preview, 5);
            $scope.$apply(function (){
              $scope.palette = palette

              if ($scope.currentAssociation.bgColor != null) {
                var currentIndex = 0
                for (index in $scope.palette) {
                  var dist = $scope.distance($scope.palette[index], $scope.hexToRgb($scope.currentAssociation.bgColor))
                  if (dist == 0) {
                    console.log(dist)
                    console.log(currentIndex)
                    $scope.selectColor(currentIndex)
                    break
                  }
                  currentIndex++
                }
              }else{
                $scope.selectColor(1)
              }
            });
          }
        });

        reader.onloadend = function () {
          preview.src = reader.result
        }

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    });

    $scope.$watch('profilePictureFile', function() {
      if ($scope.profilePictureFile && $scope.profilePictureFile != $scope.oldAssociation.profilePictureFile){

        var preview = document.querySelector('#profilePicture');
        var file    = $scope.profilePictureFile
        var reader  = new FileReader();

        reader.onloadend = function () {
          preview.src = reader.result
        }

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    });



     $scope.selectColor = function(radio){
       console.log('selectColor called with =>' + radio)
       var bgColor, fgColor = []
       bgColor = $scope.palette[radio]
       console.log($scope.currentAssociation.bgColor)
       console.log(rgbToHex(bgColor[0],bgColor[1],bgColor[2]))
       var d1 = $scope.distance(bgColor, [51,51,51])
       var d2 = $scope.distance(bgColor, [255,255,255])
       fgColor = (d1 > d2 ? [51,51,51] : [255,255,255])
       $scope.selectedColor = radio
       $scope.currentAssociation.bgColor = rgbToHex(bgColor[0],bgColor[1],bgColor[2])
       $scope.currentAssociation.fgColor = rgbToHex(fgColor[0],fgColor[1],fgColor[2])
     }

     $scope.removeCoverPicture = function(){
       $scope.coverPictureFile = null
       $scope.palette = null
     }

     $scope.removeProfilePicture = function(){
       $scope.profilePictureFile = null
     }

    function rgbToHex(r, g, b) {
        return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

     $scope.hexToRgb = function(hex) {
      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;
      return [r,g,b];
     }

  Association.get({id:Session.getAssociation(), token:Session.getToken()}, function(assos) {
    $scope.profilePictureFile = (assos.profile != null ? 'https://cdn.thomasmorel.io/' + assos.profile : null)
    assos.profilePicture = (assos.profile != null ? 'https://cdn.thomasmorel.io/' + assos.profile : null)
    $scope.coverPictureFile = (assos.cover != null ? 'https://cdn.thomasmorel.io/' + assos.cover : null)
    assos.coverPicture = (assos.cover != null ? 'https://cdn.thomasmorel.io/' + assos.cover : null)
    $scope.oldAssociation = assos
    $scope.currentAssociation = assos
  }, function(error) {
      Session.destroyCredentials()
      $location.path('/login')
  });

  $scope.updateAssociation = function() {
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    Association.update({id:Session.getAssociation(), token:Session.getToken()}, $scope.currentAssociation, function(assos) {
      if($scope.coverPictureFile != null && $scope.coverPictureFile != $scope.oldAssociation.coverPictureFile){
        var file = $scope.coverPictureFile;
        var uploadUrl = 'https://api.thomasmorel.io/association/' + $scope.currentAssociation.ID + '/coverimage?token=' + Session.getToken();
        $scope.promise = fileUpload.uploadFileToUrl(file, uploadUrl, function(success){
          $loadingOverlay.hide()
          if(success){
            ngDialog.open({
                template: "<h2 style='text-align:center;'>L'association a bien été mise à jour</h2>",
                plain: true,
                className: 'ngdialog-theme-default'
            });
          }else{
            ngDialog.open({
                template: "<h2 style='text-align:center;'>Une erreur s'est produite :/</h2>",
                plain: true,
                className: 'ngdialog-theme-default'
            });
          }
        });
      }
      if($scope.profilePictureFile != null && $scope.profilePictureFile != $scope.oldAssociation.profilePictureFile){
        var file = $scope.profilePictureFile;
        var uploadUrl = 'https://api.thomasmorel.io/association/' + $scope.currentAssociation.ID + '/profileimage?token=' + Session.getToken();
        $scope.promise = fileUpload.uploadFileToUrl(file, uploadUrl, function(success){
          $loadingOverlay.hide()
          if(success){
            ngDialog.open({
                template: "<h2 style='text-align:center;'>L'association a bien été mise à jour</h2>",
                plain: true,
                className: 'ngdialog-theme-default'
            });
          }else{
            ngDialog.open({
                template: "<h2 style='text-align:center;'>Une erreur s'est produite :/</h2>",
                plain: true,
                className: 'ngdialog-theme-default'
            });
          }
        });
      }else{
        $loadingOverlay.hide()
        ngDialog.open({
            template: "<h2 style='text-align:center;'>L'association a bien été mise à jour</h2>",
            plain: true,
            className: 'ngdialog-theme-default'
        });
      }
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/login')
    });
  }

}]);
