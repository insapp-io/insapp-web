app.controller('CreateEvent', ['$scope', '$resource', 'Session', '$location', '$colorThief', 'Upload', 'fileUpload', 'ngDialog', '$loadingOverlay', function($scope, $resource, Session, $location, $colorThief, Upload, fileUpload, ngDialog, $loadingOverlay) {
  var Event = $resource('https://api.thomasmorel.io/event?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.isActive = function (viewLocation) {
      return viewLocation === "myEvents"
  };

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


  $scope.$watch('file', function() {
    if ($scope.file){

      var preview = document.querySelector('img');
      var file    = $scope.file
      var reader  = new FileReader();

      $("#img").on('load',function(){
        var colorThief = new ColorThief()
        var palette = colorThief.getPalette(preview, 5, 1);
        $scope.$apply(function (){
          $scope.palette = palette
          $scope.selectColor(1)
        });
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
     $scope.currentEvent.bgColor = rgbToHex(bgColor[0],bgColor[1],bgColor[2])
     $scope.currentEvent.fgColor = rgbToHex(fgColor[0],fgColor[1],fgColor[2])
   }

  function rgbToHex(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }


  $scope.removeFile = function(){
    $scope.file = null
    $scope.palette = null
  }

  $scope.currentEvent = {
      name        : "",
      association : Session.getAssociation(),
      description : "",
      photoURL    : "",
      dateStart   : null,
      dateEnd     : null,
      participants: [],
      bgColor     : "",
      fgColor     : ""
    }


  $scope.createEvent = function(isValid) {
    if (!isValid){
      return
    }
    $loadingOverlay.show()
    $("html, body").animate({ scrollTop: 0 }, "slow");
    Event.save({token:Session.getToken()}, $scope.currentEvent, function(event) {
      if($scope.file){
        var file = $scope.file;
        var uploadUrl = 'https://api.thomasmorel.io/event/' + event.ID + '/image?token=' + Session.getToken();
        fileUpload.uploadFileToUrl(file, uploadUrl, function(success){
          $loadingOverlay.hide()
          if(success){
            ngDialog.open({
                template: "<h2 style='text-align:center;'>L'événement a bien été créé</h2>",
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
      }
    }, function(error) {
        Session.destroyCredentials()
        $location.path('/login')
    });
  }

}]);
