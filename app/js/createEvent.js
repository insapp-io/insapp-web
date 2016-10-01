app.controller('CreateEvent', ['$scope', '$resource', 'Session', '$location', 'Upload', 'fileUpload', 'ngDialog', '$loadingOverlay', function($scope, $resource, Session, $location, Upload, fileUpload, ngDialog, $loadingOverlay) {
  var Event = $resource('https://insapp.thomasmorel.io/api/v1/event?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.currentEvent = {
      name        : "",
      association : Session.getAssociation(),
      description : "",
      image       : "",
      palette     : [],
      selectedcolor: 0,
      dateStart   : null,
      dateEnd     : null,
      participants: [],
      bgColor     : "",
      fgColor     : ""
  }

  function distance(v1, v2){
    var i, d = 0;
    for (i = 0; i < v1.length; i++) {
      d += (v1[i] - v2[i])*(v1[i] - v2[i]);
    }
    return Math.sqrt(d);
  };

  $scope.monitorLength = function (field, maxLength) {
    if ($scope.currentEvent[field] && $scope.currentEvent[field].length && $scope.currentEvent[field].length > maxLength) {
      $scope.currentEvent[field] = $scope.currentEvent[field].substring(0, maxLength);
    }
  }

  $scope.$watch('eventImageFile', function() {
    if ($scope.eventImageFile){
      var preview = document.querySelector('#eventImage');
      var file    = $scope.eventImageFile
      var reader  = new FileReader();

      $("#eventImage").on('load',function(){
        $scope.uploadImage($scope.eventImageFile, null, function(response) {
          $scope.currentEvent.image = response.file
          $scope.currentEvent.palette = response.colors
          $scope.palette = response.colors
          $scope.selectColor(0)
        })
      });

      reader.onloadend = function () {
        preview.src = reader.result
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  });

  $scope.selectColor = function(radio){
    var bgColor, fgColor = []
    bgColor = $scope.palette[radio]
    var d1 = distance(bgColor, [51,51,51])
    var d2 = distance(bgColor, [255,255,255])
    fgColor = (d1 > d2 ? [51,51,51] : [255,255,255])
    $scope.currentEvent.selectedcolor = radio
    $scope.currentEvent.bgColor = rgbToHex(bgColor[0],bgColor[1],bgColor[2])
    $scope.currentEvent.fgColor = rgbToHex(fgColor[0],fgColor[1],fgColor[2])
  }

  function rgbToHex(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  $scope.removeFile = function(){
    var preview = document.querySelector('#eventImage');
    preview.src = null
    $scope.eventImageFile = null
    $scope.palette = null
  }

  $scope.uploadImage = function (file, fileName, completion) {
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    var uploadUrl = 'https://insapp.thomasmorel.io/api/v1/image' + (fileName && fileName.length > 10 ? "/" + fileName : "") + '?token=' + Session.getToken();
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
        });
      }
    });
  }

  $scope.createEvent = function(isValid) {
    if (!isValid){ return }
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    Event.save({token:Session.getToken()}, $scope.currentEvent, function(event) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>L'événement a bien été créé</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
      $scope.currentEvent = event
      $loadingOverlay.hide()
      $location.path('/myEvents')
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/login')
    });
  }

}]);
