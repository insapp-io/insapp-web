app.controller('MyAssociation', ['$scope', '$resource', 'Session', '$location', 'ngDialog', function($scope, $resource, Session, $location, ngDialog) {
  var Association = $resource('http://127.0.0.1:9000/association/:id?token=:token', null, {
  'update': { method:'PUT' }
});


  if(Session.getToken() == null || Session.getAssociation() == null){
    $location.path('/login')
  }

  $scope.currentAssociation = Association.get({id:Session.getAssociation(), token:Session.getToken()}, function(assos) {

  });

  $scope.updateAssociation = function() {
    Association.update({id:Session.getAssociation(), token:Session.getToken()}, $scope.currentAssociation, function(assos) {
      ngDialog.open({
          template: "<h2 style='text-align:center;'>L'association à été modifiée</h2>",
          plain: true,
          className: 'ngdialog-theme-default'
      });
    });
  }

}])
;
