app.controller('MyAssociation', ['$scope', '$resource', function($scope, $resource) {
  var Association = $resource('http://127.0.0.1:9000/association/:id', null, {
  'update': { method:'PUT' }
});

  $scope.currentAssociation = Association.get({id:"56d3716d0254b40c899f7988"}, function(assos) {
    
  });

  $scope.updateAssociation = function() {
    Association.update({id:"56d3716d0254b40c899f7988"}, $scope.currentAssociation, function(assos) {

    });
  }

}])
;
