app.controller('MyEventReader', ['$scope', '$resource', '$routeParams', 'Session', '$location', 'ngDialog', 'fileUpload', function($scope, $resource, $routeParams, Session, $location, ngDialog, fileUpload) {
  var Event = $resource('http://127.0.0.1:9000/event/:id?token=:token', null, {
    'update': { method:'PUT' }
  });

  $scope.master = (Session.getMaster() == 'true')

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

  function distance(v1, v2){
      var i, d = 0;
      for (i = 0; i < v1.length; i++) {
          d += (v1[i] - v2[i])*(v1[i] - v2[i]);
      }
      return Math.sqrt(d);
  };

    $scope.$watch('file', function() {
      if ($scope.file && $scope.file != $scope.oldEvent.photo){
        console.log($scope.file)
        var preview = document.querySelector('img');
        var file    = $scope.file
        var reader  = new FileReader();

        $("#img").on('load',function(){
          if ($scope.file && $scope.file != $scope.oldEvent.file){
          var colorThief = new ColorThief()
          var palette = colorThief.getPalette(preview, 5, 1);
          $scope.$apply(function (){
            $scope.palette = palette
            $scope.selectColor(1)
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


    Event.get({id:$routeParams.id, token:Session.getToken()}, function(event) {
        event.nbParticipant = (event.participants != null ? event.participants.length : 0)
        event.photo = 'http://127.0.0.1:9003/' + event.photoURL
        $scope.file = 'http://127.0.0.1:9003/' + event.photoURL
        $scope.oldEvent = event
        $scope.currentEvent = event
      }, function(error) {
          Session.destroyCredentials()
          $location.path('/login')
      });

      $scope.updateEvent = function() {
        Event.update({id:$scope.currentEvent.ID, token:Session.getToken()}, $scope.currentEvent, function(event) {
          if ($scope.file != $scope.oldEvent.image){
            var file = $scope.file;
            var uploadUrl = 'http://127.0.0.1:9000/event/' + $scope.currentEvent.ID + '/image?token=' + Session.getToken();
            fileUpload.uploadFileToUrl(file, uploadUrl, function(success){
              if(success){
                ngDialog.open({
                    template: "<h2 style='text-align:center;'>L'événement a bien été mis à jour</h2>",
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
            return
          }
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été mis à jour</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.deleteEvent = function() {
        Event.remove({id:$scope.currentEvent.ID, token:Session.getToken()}, function(event) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été supprimé</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.validateEvent = function() {
        $scope.oldEvent.status = "validated"
        Event.update({id:$scope.currentEvent.ID, token:Session.getToken()}, $scope.oldEvent, function(event) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été validé</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.rejectEvent = function() {
        $scope.oldEvent.status = "rejected"
        Event.update({id:$scope.currentEvent.ID, token:Session.getToken()}, $scope.oldEvent, function(event) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été rejeté</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }

      $scope.waitingEvent = function() {
        $scope.oldEvent.status = "waiting"
        Event.update({id:$scope.currentEvent.ID, token:Session.getToken()}, $scope.oldEvent, function(event) {
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été mis en attente</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        }, function(error) {
            Session.destroyCredentials()
            $location.path('/login')
        });
      }
    }]);
