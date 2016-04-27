app.controller('CreateEvent', ['$scope', '$resource', 'fileUpload', function($scope, $resource, fileUpload) {
  var Event = $resource('http://127.0.0.1:9000/event/:id');

  $scope.currentEvent = {
      name        : "",
      association : "56d3716d0254b40c899f7988",
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
    Event.save({}, $scope.currentEvent, function(event) {
      if($scope.myFile){
        var file = $scope.myFile;
        var uploadUrl = 'http://127.0.0.1:9000/event/' + event.ID + '/image';
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

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          console.log("post success")
        })
        .error(function(){
          console.log("post error")
        });
    }
}]);
