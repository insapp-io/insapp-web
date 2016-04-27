app.controller('CreateEvent', ['$scope', '$resource', 'fileUpload', 'Session', '$location', function($scope, $resource, fileUpload, Session, $location) {
  var Event = $resource('http://127.0.0.1:9000/event?token=:token');

  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.currentEvent = {
      name        : "",
      association : Session.getAssociation(),
      description : "",
      photoURL    : "",
      status      : "waiting",
      dateStart   : "",
      dateEnd     : "",
      participants: [],
      bgColor     : "FFEE33",
      fgColor     : "333333"
    }

  $scope.createEvent = function() {
    Event.save({token:Session.getToken()}, $scope.currentEvent, function(event) {
      if($scope.myFile){
        var file = $scope.myFile;
        var uploadUrl = 'http://127.0.0.1:9000/event/' + event.ID + '/image?token=' + Session.getToken();
        fileUpload.uploadFileToUrl(file, uploadUrl);
      }
    });
  }

}]);


app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', 'ngDialog',  function ($http, ngDialog) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          ngDialog.open({
              template: "<h2 style='text-align:center;'>L'événément à été crée</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        })
        .error(function(){
          ngDialog.open({
              template: "<h2 style='text-align:center;'>Une erreur s'est produite</h2>",
              plain: true,
              className: 'ngdialog-theme-default'
          });
        });
    }
}]);
